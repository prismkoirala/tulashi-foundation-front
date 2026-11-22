import { useEffect, useState } from 'react';
import {
  deleteMember,
  fetchMembersPage,
  MEMBER_TYPES,
  normalizeMemberType,
} from '../lib/api.js';

const DEFAULT_FILTERS = {
  q: '',
  memberType: 'all',
  designation: '',
  address: '',
  email: '',
  phone: '',
  hasPhoto: 'any',
  hasDesignation: 'any',
  createdFrom: '',
  createdTo: '',
  sort: 'sort_order',
};

const PAGE_SIZES = [10, 25, 50];

const memberTypeLabel = (value) =>
  MEMBER_TYPES.find((t) => t.value === normalizeMemberType(value))?.label || 'Life';

const useDebounced = (value, ms) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(timer);
  }, [value, ms]);
  return debounced;
};

const pageWindow = (page, totalPages) => {
  const width = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + width - 1);
  start = Math.max(1, end - width + 1);
  const pages = [];
  for (let i = start; i <= end; i += 1) pages.push(i);
  return pages;
};

export default function MembersAdmin({ go }) {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const debouncedFilters = useDebounced(filters, 300);
  const filterKey = JSON.stringify(debouncedFilters);
  const [pageFilterKey, setPageFilterKey] = useState(filterKey);
  if (pageFilterKey !== filterKey) {
    setPageFilterKey(filterKey);
    if (page !== 1) setPage(1);
  }

  useEffect(() => {
    const ac = new AbortController();
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await fetchMembersPage({
          ...debouncedFilters,
          page,
          pageSize,
          signal: ac.signal,
        });
        if (ac.signal.aborted) return;
        setRows(result.rows);
        setTotal(result.total);
      } catch (err) {
        if (ac.signal.aborted) return;
        setError(err.message || 'Could not load members');
      } finally {
        if (!ac.signal.aborted) {
          setLoading(false);
          setLoadedOnce(true);
        }
      }
    };
    load();

    return () => ac.abort();
  }, [filterKey, debouncedFilters, page, pageSize, reloadKey]);

  const patchFilters = (patch) => setFilters((current) => ({ ...current, ...patch }));

  const advancedCount = [
    filters.designation,
    filters.address,
    filters.email,
    filters.phone,
    filters.createdFrom,
    filters.createdTo,
    filters.hasPhoto !== 'any' ? filters.hasPhoto : '',
    filters.hasDesignation !== 'any' ? filters.hasDesignation : '',
    filters.sort !== 'sort_order' ? filters.sort : '',
  ].filter(Boolean).length;

  const filtersActive =
    advancedCount > 0 || filters.q.trim() !== '' || filters.memberType !== 'all';

  const onDelete = async (row) => {
    if (!window.confirm(`Delete member “${row.name}”?`)) return;
    setBusy(true);
    try {
      await deleteMember(row.id);
      if (rows.length === 1 && page > 1) setPage((current) => current - 1);
      else setReloadKey((key) => key + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const rangeFrom = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeTo = Math.min(page * pageSize, total);
  const pages = pageWindow(page, totalPages);

  return (
    <div className="dash-panel">
      <div className="dash-panel-head">
        <div>
          <h2>Members</h2>
          <p>Executive members appear on the public Members page. Life members are admin-only.</p>
        </div>
        <button type="button" className="btn btn-crimson" onClick={() => go('dashboard/members/new')}>
          Add member
        </button>
      </div>

      <div className="dash-toolbar">
        <input
          className="dash-search"
          placeholder="Search by name, address, designation, email, phone…"
          value={filters.q}
          onChange={(e) => patchFilters({ q: e.target.value })}
          aria-label="Search members"
        />
        <select
          className="dash-filter"
          value={filters.memberType}
          onChange={(e) => patchFilters({ memberType: e.target.value })}
          aria-label="Filter by member type"
        >
          <option value="all">All types</option>
          {MEMBER_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          className={`dash-filter dash-filter-toggle${advancedOpen || advancedCount ? ' active' : ''}`}
          aria-expanded={advancedOpen}
          onClick={() => setAdvancedOpen((open) => !open)}
        >
          Advanced filters{advancedCount ? ` (${advancedCount})` : ''}
        </button>
        <span className="dash-count">
          {loading && loadedOnce ? 'Updating…' : `${total} member${total === 1 ? '' : 's'}`}
        </span>
      </div>

      {advancedOpen && (
        <div className="dash-advanced">
          <label>
            Designation
            <input
              value={filters.designation}
              onChange={(e) => patchFilters({ designation: e.target.value })}
              placeholder="Contains…"
            />
          </label>
          <label>
            Address
            <input
              value={filters.address}
              onChange={(e) => patchFilters({ address: e.target.value })}
              placeholder="Current or permanent"
            />
          </label>
          <label>
            Email
            <input
              value={filters.email}
              onChange={(e) => patchFilters({ email: e.target.value })}
              placeholder="Contains…"
            />
          </label>
          <label>
            Phone
            <input
              value={filters.phone}
              onChange={(e) => patchFilters({ phone: e.target.value })}
              placeholder="Contains…"
            />
          </label>
          <label>
            Photo
            <select
              value={filters.hasPhoto}
              onChange={(e) => patchFilters({ hasPhoto: e.target.value })}
            >
              <option value="any">Any</option>
              <option value="yes">With photo</option>
              <option value="no">Without photo</option>
            </select>
          </label>
          <label>
            Role
            <select
              value={filters.hasDesignation}
              onChange={(e) => patchFilters({ hasDesignation: e.target.value })}
            >
              <option value="any">Any</option>
              <option value="yes">With designation</option>
              <option value="no">Without designation</option>
            </select>
          </label>
          <label>
            Created from
            <input
              type="date"
              value={filters.createdFrom}
              onChange={(e) => patchFilters({ createdFrom: e.target.value })}
            />
          </label>
          <label>
            Created to
            <input
              type="date"
              value={filters.createdTo}
              onChange={(e) => patchFilters({ createdTo: e.target.value })}
            />
          </label>
          <label>
            Sort
            <select value={filters.sort} onChange={(e) => patchFilters({ sort: e.target.value })}>
              <option value="sort_order">Sort order</option>
              <option value="name_asc">Name A–Z</option>
              <option value="name_desc">Name Z–A</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="designation">Designation</option>
            </select>
          </label>
          <div className="dash-advanced-actions">
            <button
              type="button"
              className="dash-clear"
              disabled={!filtersActive}
              onClick={() => setFilters(DEFAULT_FILTERS)}
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {error && <div className="dash-alert">{error}</div>}
      {!loadedOnce && loading ? (
        <div className="dash-empty">Loading members…</div>
      ) : rows.length === 0 ? (
        <div className="dash-empty">
          {filtersActive ? 'No members match these filters.' : 'No members yet. Add the first one.'}
        </div>
      ) : (
        <div className={`dash-table-wrap${loading ? ' is-loading' : ''}`}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Designation</th>
                <th>Type</th>
                <th className="dash-row-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
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
                  <td>
                    <span
                      className={`dash-badge dash-badge-${normalizeMemberType(row.member_type)}`}
                    >
                      {memberTypeLabel(row.member_type)}
                    </span>
                  </td>
                  <td className="dash-row-actions">
                    <div className="dash-actions">
                      <button type="button" onClick={() => go(`dashboard/members/${row.id}`)}>
                        Edit
                      </button>
                      <button type="button" className="danger" onClick={() => onDelete(row)} disabled={busy}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loadedOnce && total > 0 && (
        <div className="dash-pager">
          <span className="dash-count">
            Showing {rangeFrom}–{rangeTo} of {total}
          </span>
          <div className="dash-pager-pages">
            <button type="button" onClick={() => setPage(1)} disabled={page === 1 || loading}>
              First
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1 || loading}
            >
              Previous
            </button>
            {pages.map((n) => (
              <button
                key={n}
                type="button"
                aria-current={n === page ? 'page' : undefined}
                onClick={() => setPage(n)}
                disabled={loading}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page >= totalPages || loading}
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages || loading}
            >
              Last
            </button>
          </div>
          <label className="dash-count">
            Rows{' '}
            <select
              className="dash-page-size"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Rows per page"
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

    </div>
  );
}
