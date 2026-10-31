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

export async function fetchMembers() {
  const { data, error } = await ensure()
    .from('members')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createMember(payload) {
  const { data, error } = await ensure().from('members').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateMember(id, payload) {
  const { data, error } = await ensure().from('members').update(payload).eq('id', id).select().single();
  if (error) throw error;
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
