import { useEffect, useMemo, useState } from 'react';
import {
  createMember,
  DEFAULT_MEMBER_TYPE,
  fetchMember,
  MEMBER_TYPES,
  normalizeMemberType,
  updateMember,
  uploadMemberImage,
} from '../lib/api.js';
import { bioIsEmpty, sanitizeBio } from '../lib/bio.js';
import BioEditor from './BioEditor.jsx';

const empty = {
  name: '',
  address: '',
  permanent_address: '',
  email: '',
  phone: '',
  designation: '',
  member_type: DEFAULT_MEMBER_TYPE,
  image_url: '',
  sort_order: 0,
  bio: '',
};

export default function MemberEditor({ memberId, go }) {
  const isNew = memberId === 'new';
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');
  const [missing, setMissing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(isNew);

  useEffect(() => {
    if (isNew) return undefined;
    const ac = new AbortController();
    const load = async () => {
      setLoading(true);
      setError('');
      setMissing(false);
      try {
        const row = await fetchMember(memberId);
        if (ac.signal.aborted) return;
        if (!row) {
          setMissing(true);
          return;
        }
        setForm({
          name: row.name || '',
          address: row.address || '',
          permanent_address: row.permanent_address || '',
          email: row.email || '',
          phone: row.phone || '',
          designation: row.designation || '',
          member_type: normalizeMemberType(row.member_type),
          image_url: row.image_url || '',
          sort_order: row.sort_order ?? 0,
          bio: row.bio || '',
        });
        setReady(true);
      } catch (err) {
        if (ac.signal.aborted) return;
        setError(err.message || 'Could not load this member');
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => ac.abort();
  }, [isNew, memberId]);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);
  useEffect(() => {
    if (!previewUrl) return undefined;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const setField = (key) => (e) => setForm((current) => ({ ...current, [key]: e.target.value }));
  const isExecutive = normalizeMemberType(form.member_type) === 'executive';

  const onSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      let image_url = form.image_url || null;
      if (file) image_url = await uploadMemberImage(file);
      const member_type = normalizeMemberType(form.member_type);
      const bio =
        member_type === 'executive' && !bioIsEmpty(form.bio) ? sanitizeBio(form.bio) : null;
      const payload = {
        name: form.name.trim(),
        address: form.address.trim() || null,
        permanent_address: form.permanent_address.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        designation: form.designation.trim() || null,
        member_type,
        image_url,
        sort_order: Number(form.sort_order) || 0,
        bio,
      };
      if (isNew) await createMember(payload);
      else await updateMember(memberId, payload);
      go('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="dash-panel">
      <div className="dash-panel-head">
        <div>
          <button type="button" className="dash-link dash-back" onClick={() => go('dashboard')}>
            ← Members
          </button>
          <h2>{isNew ? 'Add member' : 'Edit member'}</h2>
          <p>
            Executive members appear on the public Members page and can have a biography. Life
            members stay admin-only.
          </p>
        </div>
      </div>

      {error && <div className="dash-alert">{error}</div>}
      {loading ? (
        <div className="dash-empty">Loading member…</div>
      ) : missing ? (
        <div className="dash-empty">This member could not be found.</div>
      ) : (
        <form className="dash-editor" onSubmit={onSave}>
          <div className="dash-form-grid">
            <label>
              Name *
              <input value={form.name} onChange={setField('name')} required />
            </label>
            <label>
              Designation
              <input
                value={form.designation}
                onChange={setField('designation')}
                placeholder="e.g. President, Lifetime Member"
              />
            </label>
            <label>
              Member type *
              <select value={form.member_type} onChange={setField('member_type')}>
                {MEMBER_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <span className="dash-tiny">
                Executive and advisory board appear on the public Members page. Life members are listed by name. International candidates stay in the dashboard.
              </span>
            </label>
            <label>
              Sort order
              <input type="number" value={form.sort_order} onChange={setField('sort_order')} />
            </label>
            <label>
              Address (current)
              <input value={form.address} onChange={setField('address')} />
            </label>
            <label>
              Permanent address
              <input value={form.permanent_address} onChange={setField('permanent_address')} />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={setField('email')} />
            </label>
            <label>
              Phone
              <input value={form.phone} onChange={setField('phone')} />
            </label>
            <label>
              Photo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <div className="dash-preview dash-preview-slot">
              {(previewUrl || form.image_url) && (
                <img src={previewUrl || form.image_url} alt="" />
              )}
            </div>
          </div>

          {isExecutive ? (
            <div className="dash-bio-field">
              <div className="dash-bio-label">Biography</div>
              <p className="dash-tiny">
                Shown on the public Members page when this card is expanded.
              </p>
              {ready && (
                <BioEditor
                  key={isNew ? 'new' : memberId}
                  value={form.bio}
                  onChange={(bio) => setForm((current) => ({ ...current, bio }))}
                />
              )}
            </div>
          ) : (
            <p className="dash-note">Biography is available only for executive members.</p>
          )}

          <div className="dash-modal-actions">
            <button type="button" className="btn btn-outline-ink" onClick={() => go('dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-crimson" disabled={busy}>
              {busy ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
