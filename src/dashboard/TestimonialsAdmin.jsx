import { useEffect, useState } from 'react';
import {
  createTestimonial,
  deleteTestimonial,
  deleteTestimonialImage,
  fetchTestimonials,
  updateTestimonial,
} from '../lib/api.js';

const empty = {
  title: '',
  description: '',
  event_address: '',
  sort_order: 0,
};

export default function TestimonialsAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [existingImages, setExistingImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setRows(await fetchTestimonials());
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
    setExistingImages([]);
    setFiles([]);
  };

  const openEdit = (row) => {
    setEditing(row.id);
    setForm({
      title: row.title || '',
      description: row.description || '',
      event_address: row.event_address || '',
      sort_order: row.sort_order ?? 0,
    });
    setExistingImages(row.images || []);
    setFiles([]);
  };

  const closeForm = () => {
    setEditing(null);
    setForm(empty);
    setExistingImages([]);
    setFiles([]);
  };

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        event_address: form.event_address.trim() || null,
        sort_order: Number(form.sort_order) || 0,
      };
      if (editing === 'new') await createTestimonial(payload, files);
      else await updateTestimonial(editing, payload, files);
      closeForm();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (row) => {
    if (!window.confirm(`Delete “${row.title}”?`)) return;
    setBusy(true);
    try {
      await deleteTestimonial(row.id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const removeExistingImage = async (img) => {
    if (!window.confirm('Remove this image?')) return;
    setBusy(true);
    try {
      await deleteTestimonialImage(img.id);
      setExistingImages((list) => list.filter((i) => i.id !== img.id));
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
          <h2>Events &amp; Memories</h2>
          <p>Testimonials page entries — title, description, place, and photos.</p>
        </div>
        <button type="button" className="btn btn-crimson" onClick={openCreate}>
          Add entry
        </button>
      </div>

      {error && <div className="dash-alert">{error}</div>}

      {loading ? (
        <div className="dash-empty">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="dash-empty">No entries yet. Add a scholarship day, honour event, or gathering.</div>
      ) : (
        <div className="dash-event-grid">
          {rows.map((row) => (
            <article className="dash-event-card" key={row.id}>
              <div className="dash-event-thumbs">
                {(row.images || []).slice(0, 3).map((img) => (
                  <img key={img.id} src={img.image_url} alt="" />
                ))}
                {(row.images || []).length === 0 && <div className="dash-event-ph">No photos</div>}
              </div>
              <h3>{row.title}</h3>
              {row.event_address && <div className="dash-tiny">{row.event_address}</div>}
              <p>{row.description || 'No description'}</p>
              <div className="dash-actions">
                <button type="button" onClick={() => openEdit(row)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => onDelete(row)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <div className="dash-modal" role="dialog" aria-modal="true">
          <form className="dash-modal-card wide" onSubmit={onSave}>
            <div className="dash-modal-head">
              <h3>{editing === 'new' ? 'Add entry' : 'Edit entry'}</h3>
              <button type="button" className="dash-x" onClick={closeForm} aria-label="Close">
                ×
              </button>
            </div>
            <div className="dash-form-grid">
              <label className="full">
                Title *
                <input value={form.title} onChange={setField('title')} required />
              </label>
              <label className="full">
                Description
                <textarea value={form.description} onChange={setField('description')} rows={4} />
              </label>
              <label>
                Event address / place
                <input value={form.event_address} onChange={setField('event_address')} />
              </label>
              <label>
                Sort order
                <input type="number" value={form.sort_order} onChange={setField('sort_order')} />
              </label>
              <label className="full">
                Add images (multiple)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
              </label>
            </div>

            {existingImages.length > 0 && (
              <div className="dash-img-list">
                {existingImages.map((img) => (
                  <div className="dash-img-item" key={img.id}>
                    <img src={img.image_url} alt="" />
                    <button type="button" onClick={() => removeExistingImage(img)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {files.length > 0 && (
              <div className="dash-tiny" style={{ marginTop: 8 }}>
                {files.length} new image(s) selected
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
