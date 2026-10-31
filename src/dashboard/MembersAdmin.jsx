import { useEffect, useState } from 'react';
import {
  createMember,
  deleteMember,
  fetchMembers,
  updateMember,
  uploadMemberImage,
} from '../lib/api.js';

const empty = {
  name: '',
  address: '',
  permanent_address: '',
  email: '',
  phone: '',
  designation: '',
  image_url: '',
  sort_order: 0,
};

export default function MembersAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setRows(await fetchMembers());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm(empty);
    setFile(null);
  };

  const openEdit = (row) => {
    setEditing(row.id);
    setForm({
      name: row.name || '',
      address: row.address || '',
      permanent_address: row.permanent_address || '',
      email: row.email || '',
      phone: row.phone || '',
      designation: row.designation || '',
      image_url: row.image_url || '',
      sort_order: row.sort_order ?? 0,
    });
    setFile(null);
  };

  const closeForm = () => {
    setEditing(null);
    setForm(empty);
    setFile(null);
  };

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      let image_url = form.image_url || null;
      if (file) image_url = await uploadMemberImage(file);
      const payload = {
        name: form.name.trim(),
        address: form.address.trim() || null,
        permanent_address: form.permanent_address.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        designation: form.designation.trim() || null,
        image_url,
        sort_order: Number(form.sort_order) || 0,
      };
      if (editing === 'new') await createMember(payload);
      else await updateMember(editing, payload);
      closeForm();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (row) => {
    if (!window.confirm(`Delete member “${row.name}”?`)) return;
    setBusy(true);
    try {
      await deleteMember(row.id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const filtered = rows.filter((r) => {
    const hay = `${r.name} ${r.address || ''} ${r.designation || ''} ${r.email || ''}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  return (
    <div className="dash-panel">
      <div className="dash-panel-head">
        <div>
          <h2>Members</h2>
          <p>Lifetime and general members — create, edit, or remove.</p>
        </div>
        <button type="button" className="btn btn-crimson" onClick={openCreate}>
          Add member
        </button>
      </div>

      <div className="dash-toolbar">
        <input
          className="dash-search"
          placeholder="Search by name, address, designation…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="dash-count">{filtered.length} shown</span>
      </div>

      {error && <div className="dash-alert">{error}</div>}
      {loading ? (
        <div className="dash-empty">Loading members…</div>
      ) : filtered.length === 0 ? (
        <div className="dash-empty">No members yet. Add the first one.</div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Designation</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="dash-person">
                      {row.image_url ? (
                        <img src={row.image_url} alt="" />
                      ) : (
                        <span className="dash-avatar">{(row.name || '?').slice(0, 1)}</span>
                      )}
                      <strong>{row.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="dash-muted">{row.address || '—'}</div>
                    {row.permanent_address && (
                      <div className="dash-tiny">Perm: {row.permanent_address}</div>
                    )}
                  </td>
                  <td>
                    <div className="dash-muted">{row.email || '—'}</div>
                    <div className="dash-tiny">{row.phone || ''}</div>
                  </td>
                  <td>{row.designation || '—'}</td>
                  <td className="dash-actions">
                    <button type="button" onClick={() => openEdit(row)}>
                      Edit
                    </button>
                    <button type="button" className="danger" onClick={() => onDelete(row)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="dash-modal" role="dialog" aria-modal="true">
          <form className="dash-modal-card" onSubmit={onSave}>
            <div className="dash-modal-head">
              <h3>{editing === 'new' ? 'Add member' : 'Edit member'}</h3>
              <button type="button" className="dash-x" onClick={closeForm} aria-label="Close">
                ×
              </button>
            </div>
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
                Sort order
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={setField('sort_order')}
                />
              </label>
              <label>
                Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
            {(form.image_url || file) && (
              <div className="dash-preview">
                <img src={file ? URL.createObjectURL(file) : form.image_url} alt="" />
              </div>
            )}
            <div className="dash-modal-actions">
              <button type="button" className="btn btn-outline-ink" onClick={closeForm}>
                Cancel
              </button>
              <button type="submit" className="btn btn-crimson" disabled={busy}>
                {busy ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
