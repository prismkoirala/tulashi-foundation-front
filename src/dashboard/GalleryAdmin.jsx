import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createGalleryImages,
  deleteGalleryImages,
  fetchGallery,
  updateGalleryImage,
} from '../lib/api.js';

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const fileKey = (file) =>
  `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`;

export default function GalleryAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [queue, setQueue] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(() => new Set());
  const [editing, setEditing] = useState(null);
  const [caption, setCaption] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const inputRef = useRef(null);
  const anchorRef = useRef(null);
  const queueRef = useRef([]);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(
    () => () => {
      queueRef.current.forEach((item) => URL.revokeObjectURL(item.url));
    },
    [],
  );

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setRows(await fetchGallery());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchGallery();
        if (!alive) return;
        setRows(data);
      } catch (err) {
        if (alive) setError(err.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => (row.caption || '').toLowerCase().includes(needle));
  }, [rows, query]);

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;
    const accepted = [];
    const problems = [];
    incoming.forEach((file) => {
      if (!ALLOWED.has(file.type)) {
        problems.push(`${file.name} must be JPEG, PNG, WebP, or GIF.`);
        return;
      }
      if (file.size > MAX_BYTES) {
        problems.push(`${file.name} is larger than 8 MB.`);
        return;
      }
      accepted.push({
        key: fileKey(file),
        file,
        url: URL.createObjectURL(file),
        caption: '',
      });
    });
    if (problems.length) setError(problems.join(' '));
    else setError('');
    if (accepted.length) setQueue((current) => [...current, ...accepted]);
  };

  const removeQueued = (key) => {
    setQueue((current) => {
      const item = current.find((entry) => entry.key === key);
      if (item) URL.revokeObjectURL(item.url);
      return current.filter((entry) => entry.key !== key);
    });
  };

  const clearQueue = () => {
    setQueue((current) => {
      current.forEach((item) => URL.revokeObjectURL(item.url));
      return [];
    });
  };

  const setQueuedCaption = (key, value) => {
    setQueue((current) => current.map((item) => (item.key === key ? { ...item, caption: value } : item)));
  };

  const onUpload = async () => {
    if (!queue.length) return;
    setBusy(true);
    setError('');
    setProgress(`Uploading 0 of ${queue.length}…`);
    try {
      await createGalleryImages(
        queue.map((item) => ({ file: item.file, caption: item.caption })),
        (done, total) => setProgress(`Uploading ${done} of ${total}…`),
      );
      clearQueue();
      setProgress('');
      await load();
    } catch (err) {
      setError(err.message);
      setProgress('');
    } finally {
      setBusy(false);
    }
  };

  const toggleSelected = (id, index, shiftKey) => {
    setSelected((current) => {
      const next = new Set(current);
      if (shiftKey && anchorRef.current != null) {
        const [start, end] = [anchorRef.current, index].sort((a, b) => a - b);
        const turnOn = !current.has(id);
        for (let i = start; i <= end; i += 1) {
          const rowId = visible[i]?.id;
          if (!rowId) continue;
          if (turnOn) next.add(rowId);
          else next.delete(rowId);
        }
      } else if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    anchorRef.current = index;
  };

  const selectVisible = () => {
    setSelected(new Set(visible.map((row) => row.id)));
  };

  const clearSelected = () => setSelected(new Set());

  const removeRows = async (items, message) => {
    if (!items.length) return;
    if (!window.confirm(message)) return;
    setBusy(true);
    setError('');
    try {
      await deleteGalleryImages(items);
      const gone = new Set(items.map((item) => item.id));
      setSelected((current) => {
        const next = new Set(current);
        gone.forEach((id) => next.delete(id));
        return next;
      });
      if (editing && gone.has(editing.id)) setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onDeleteSelected = () => {
    const items = rows.filter((row) => selected.has(row.id));
    const count = items.length;
    removeRows(
      items,
      `Delete ${count} photo${count === 1 ? '' : 's'}? They will disappear from the public gallery.`,
    );
  };

  const openEdit = (row) => {
    setEditing(row);
    setCaption(row.caption || '');
    setSortOrder(row.sort_order ?? 0);
  };

  const onSaveEdit = async (event) => {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError('');
    try {
      await updateGalleryImage(editing.id, { caption, sort_order: sortOrder });
      setEditing(null);
      await load();
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
          <h2>Gallery</h2>
          <p>Photographs on the public Gallery page. Add many at once, then remove the ones you do not want.</p>
        </div>
      </div>

      <div
        className={`dash-drop${dragOver ? ' is-over' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (event.currentTarget.contains(event.relatedTarget)) return;
          setDragOver(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          addFiles(event.dataTransfer.files);
        }}
      >
        <strong>{dragOver ? 'Drop to add these photos' : 'Drop photos here'}</strong>
        <span>or click to choose several at once · JPEG, PNG, WebP, GIF · up to 8 MB each</span>
      </div>
      <input
        ref={inputRef}
        className="dash-file"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = '';
        }}
      />

      {queue.length > 0 && (
        <>
          <div className="dash-queue">
            {queue.map((item) => (
              <article className="dash-queue-card" key={item.key}>
                <img src={item.url} alt="" />
                <div className="dash-queue-body">
                  <input
                    value={item.caption}
                    placeholder="Caption (optional)"
                    maxLength={180}
                    onChange={(event) => setQueuedCaption(item.key, event.target.value)}
                    aria-label={`Caption for ${item.file.name}`}
                  />
                  <button type="button" onClick={() => removeQueued(item.key)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="dash-queue-actions">
            <span className="dash-tiny">
              {progress || `${queue.length} photo${queue.length === 1 ? '' : 's'} ready. New uploads appear first.`}
            </span>
            <button type="button" className="btn btn-outline-ink" onClick={clearQueue} disabled={busy}>
              Clear
            </button>
            <button type="button" className="btn btn-crimson" onClick={onUpload} disabled={busy}>
              {busy ? 'Uploading…' : `Upload ${queue.length}`}
            </button>
          </div>
        </>
      )}

      <div className="dash-toolbar">
        <input
          className="dash-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search captions"
          aria-label="Search gallery captions"
        />
        <button type="button" className="dash-clear" onClick={selectVisible} disabled={!visible.length || busy}>
          Select shown
        </button>
        <span className="dash-count">
          {visible.length} photo{visible.length === 1 ? '' : 's'}
        </span>
      </div>

      {selected.size > 0 && (
        <div className="dash-select-bar">
          <strong>{selected.size} selected</strong>
          <button type="button" onClick={clearSelected}>
            Clear
          </button>
          <button type="button" className="danger" onClick={onDeleteSelected} disabled={busy}>
            Delete selected
          </button>
          <span>Shift-click a checkbox to select a range.</span>
        </div>
      )}

      {error && <div className="dash-alert">{error}</div>}

      {loading ? (
        <div className="dash-empty">Loading gallery…</div>
      ) : rows.length === 0 ? (
        <div className="dash-empty">No photographs yet. Drop a batch above to publish the gallery.</div>
      ) : visible.length === 0 ? (
        <div className="dash-empty">No photographs match that caption.</div>
      ) : (
        <div className="dash-gallery-grid">
          {visible.map((row, index) => {
            const isSelected = selected.has(row.id);
            return (
              <article className={`dash-gallery-card${isSelected ? ' is-selected' : ''}`} key={row.id}>
                <label className="dash-gallery-check">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onClick={(event) => {
                      event.preventDefault();
                      toggleSelected(row.id, index, event.shiftKey);
                    }}
                    onChange={() => {}}
                    aria-label={row.caption ? `Select ${row.caption}` : `Select photo ${index + 1}`}
                  />
                </label>
                <img src={row.image_url} alt="" />
                <div className="dash-gallery-body">
                  <p>{row.caption || 'No caption'}</p>
                  <div className="dash-tiny">Order {row.sort_order}</div>
                  <div className="dash-actions">
                    <button type="button" onClick={() => openEdit(row)} disabled={busy}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger"
                      disabled={busy}
                      onClick={() => removeRows([row], 'Remove this photo from the gallery?')}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {editing && (
        <div className="dash-modal" role="dialog" aria-modal="true">
          <form className="dash-modal-card" onSubmit={onSaveEdit}>
            <div className="dash-modal-head">
              <h3>Edit photograph</h3>
              <button type="button" className="dash-x" onClick={() => setEditing(null)} aria-label="Close">
                ×
              </button>
            </div>
            <img className="dash-gallery-edit" src={editing.image_url} alt="" />
            <div className="dash-form-grid">
              <label className="full">
                Caption
                <input value={caption} onChange={(event) => setCaption(event.target.value)} maxLength={180} />
              </label>
              <label>
                Sort order
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                />
              </label>
            </div>
            <p className="dash-tiny">Lower numbers appear first on the public gallery.</p>
            <div className="dash-modal-actions">
              <button type="button" className="btn btn-outline-ink" onClick={() => setEditing(null)}>
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
