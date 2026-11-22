import { supabase, isSupabaseConfigured } from './supabase.js';

const ensure = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env');
  }
  return supabase;
};

const publicUrl = (bucket, path) => {
  const { data } = ensure().storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

const uploadFile = async (bucket, file) => {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await ensure().storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  return publicUrl(bucket, path);
};

export const MEMBER_TYPES = [
  { value: 'executive', label: 'Executive' },
  { value: 'life', label: 'Life' },
];

export const DEFAULT_MEMBER_TYPE = 'life';

/** 'live' is the old value; treat it as life until the SQL rename is applied. */
export const normalizeMemberType = (value) => {
  if (value === 'executive') return 'executive';
  if (value === 'life' || value === 'live') return 'life';
  return DEFAULT_MEMBER_TYPE;
};

const mapMember = (row) => ({ ...row, member_type: normalizeMemberType(row.member_type) });

const withMemberTypeError = (error) => {
  if (error?.message?.includes('members_member_type_check')) {
    error.message +=
      ' Run supabase/05_member_type_life.sql in the Supabase SQL editor so member_type allows executive and life.';
  }
  if (error?.message?.includes("'bio'") || error?.message?.includes('column "bio"') || error?.message?.includes('members.bio')) {
    error.message += ' Run supabase/06_member_bio.sql in the Supabase SQL editor to add the biography column.';
  }
  return error;
};

const applyMemberTypeFilter = (query, memberType) => {
  if (!memberType || memberType === 'all') return query;
  if (memberType === 'executive') return query.eq('member_type', 'executive');
  if (memberType === 'life' || memberType === 'live') return query.in('member_type', ['life', 'live']);
  return query;
};

/** Quote a value for a PostgREST `or()` ilike, with * as the wildcard. */
const quotedLike = (raw) => {
  const value = String(raw ?? '')
    .replace(/["\\*]/g, '')
    .trim();
  return value ? `"*${value}*"` : '';
};

const escapeLike = (raw) =>
  String(raw ?? '')
    .trim()
    .replace(/\\/g, '\\\\')
    .replace(/[%_]/g, (ch) => `\\${ch}`);

const applyContains = (query, column, raw) => {
  const pattern = escapeLike(raw);
  return pattern ? query.ilike(column, `%${pattern}%`) : query;
};

const SORTS = {
  sort_order: [
    ['sort_order', true],
    ['name', true],
  ],
  name_asc: [['name', true]],
  name_desc: [['name', false]],
  newest: [['created_at', false]],
  oldest: [['created_at', true]],
  designation: [['designation', true], ['name', true]],
};

const applySort = (query, sort) => {
  const keys = SORTS[sort] || SORTS.sort_order;
  let next = query;
  for (const [column, ascending] of keys) {
    next = next.order(column, { ascending, nullsFirst: false });
  }
  return next.order('id', { ascending: true });
};

const isDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

/**
 * Dashboard member list. Filters, sort, and page window run in Postgres
 * via PostgREST — the client only receives one page.
 */
export async function fetchMembersPage({
  page = 1,
  pageSize = 10,
  q = '',
  memberType = 'all',
  designation = '',
  address = '',
  email = '',
  phone = '',
  hasPhoto = 'any',
  hasDesignation = 'any',
  createdFrom = '',
  createdTo = '',
  sort = 'sort_order',
  signal,
} = {}) {
  const size = Math.min(100, Math.max(1, Number(pageSize) || 10));
  const current = Math.max(1, Number(page) || 1);
  const from = (current - 1) * size;
  const to = from + size - 1;

  let query = ensure().from('members').select('*', { count: 'exact' });
  if (signal) query = query.abortSignal(signal);

  query = applyMemberTypeFilter(query, memberType);

  const search = quotedLike(q);
  if (search) {
    query = query.or(
      ['name', 'address', 'permanent_address', 'email', 'phone', 'designation', 'bio']
        .map((column) => `${column}.ilike.${search}`)
        .join(','),
    );
  }

  query = applyContains(query, 'designation', designation);
  query = applyContains(query, 'email', email);
  query = applyContains(query, 'phone', phone);

  const addressLike = quotedLike(address);
  if (addressLike) {
    query = query.or(`address.ilike.${addressLike},permanent_address.ilike.${addressLike}`);
  }

  if (hasPhoto === 'yes') query = query.not('image_url', 'is', null).neq('image_url', '');
  if (hasPhoto === 'no') query = query.or('image_url.is.null,image_url.eq.""');

  if (hasDesignation === 'yes') query = query.not('designation', 'is', null).neq('designation', '');
  if (hasDesignation === 'no') query = query.or('designation.is.null,designation.eq.""');

  if (isDate(createdFrom)) {
    query = query.gte('created_at', new Date(`${createdFrom}T00:00:00`).toISOString());
  }
  if (isDate(createdTo)) {
    query = query.lte('created_at', new Date(`${createdTo}T23:59:59.999`).toISOString());
  }

  query = applySort(query, sort).range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;
  return {
    rows: (data || []).map(mapMember),
    total: count ?? 0,
  };
}

/** Admin (no filter) gets all members; pass { memberType } to filter. */
export async function fetchMembers({ memberType } = {}) {
  let query = ensure()
    .from('members')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });
  query = applyMemberTypeFilter(query, memberType);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(mapMember);
}

/** Public /members page — executive members only, never life members. */
export async function fetchPublicMembers() {
  return fetchMembers({ memberType: 'executive' });
}

export async function fetchMember(id) {
  const { data, error } = await ensure().from('members').select('*').eq('id', id).maybeSingle();
  if (error) throw withMemberTypeError(error);
  return data ? mapMember(data) : null;
}

/** Biography is stored only for executive members. */
const prepareMemberWrite = (payload) => {
  const clean = { ...payload };
  if ('member_type' in clean) clean.member_type = normalizeMemberType(clean.member_type);
  if (clean.member_type && clean.member_type !== 'executive') clean.bio = null;
  if ('bio' in clean) clean.bio = clean.bio || null;
  return clean;
};

export async function createMember(payload) {
  const { data, error } = await ensure()
    .from('members')
    .insert(prepareMemberWrite(payload))
    .select()
    .single();
  if (error) throw withMemberTypeError(error);
  return data;
}

export async function updateMember(id, payload) {
  const { data, error } = await ensure()
    .from('members')
    .update(prepareMemberWrite(payload))
    .eq('id', id)
    .select()
    .single();
  if (error) throw withMemberTypeError(error);
  return data;
}

export async function deleteMember(id) {
  const { error } = await ensure().from('members').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadMemberImage(file) {
  return uploadFile('member-images', file);
}

export async function fetchTestimonials() {
  const { data, error } = await ensure()
    .from('testimonials')
    .select('*, testimonial_images(*)')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((row) => ({
    ...row,
    images: (row.testimonial_images || []).sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export async function createTestimonial({ title, description, event_address, sort_order = 0 }, imageFiles = []) {
  const client = ensure();
  const { data: row, error } = await client
    .from('testimonials')
    .insert({ title, description, event_address, sort_order })
    .select()
    .single();
  if (error) throw error;

  if (imageFiles.length) {
    const urls = [];
    for (const file of imageFiles) {
      urls.push(await uploadFile('testimonial-images', file));
    }
    const rows = urls.map((image_url, i) => ({
      testimonial_id: row.id,
      image_url,
      sort_order: i,
    }));
    const { error: imgErr } = await client.from('testimonial_images').insert(rows);
    if (imgErr) throw imgErr;
  }

  return row;
}

export async function updateTestimonial(id, { title, description, event_address, sort_order }, newImageFiles = []) {
  const client = ensure();
  const { data, error } = await client
    .from('testimonials')
    .update({ title, description, event_address, sort_order })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;

  if (newImageFiles.length) {
    const { data: existing } = await client
      .from('testimonial_images')
      .select('sort_order')
      .eq('testimonial_id', id)
      .order('sort_order', { ascending: false })
      .limit(1);
    let next = (existing?.[0]?.sort_order ?? -1) + 1;
    const rows = [];
    for (const file of newImageFiles) {
      const image_url = await uploadFile('testimonial-images', file);
      rows.push({ testimonial_id: id, image_url, sort_order: next++ });
    }
    const { error: imgErr } = await client.from('testimonial_images').insert(rows);
    if (imgErr) throw imgErr;
  }

  return data;
}

export async function deleteTestimonialImage(imageId) {
  const { error } = await ensure().from('testimonial_images').delete().eq('id', imageId);
  if (error) throw error;
}

export async function deleteTestimonial(id) {
  const { error } = await ensure().from('testimonials').delete().eq('id', id);
  if (error) throw error;
}
