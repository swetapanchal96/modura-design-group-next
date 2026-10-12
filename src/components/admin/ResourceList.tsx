'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage } from '@/lib/admin/api';
import { formatDate, getPath, stripHtml } from '@/lib/admin/utils';
import { adminPath } from '@/lib/admin/paths';
import {
  badge, btn, card, cx, rowHover, tabBtn, table, td, tdEmpty, th, toolField, toolbar,
} from '@/lib/admin/ui';
import type {
  ApiResponse, ColumnConfig, FilterConfig, ModuleConfig, PaginatedData, PaginationMeta, ResourceRecord,
} from '@/types/admin';
import PageHeader from './PageHeader';
import Pagination from './Pagination';
import Loader from './Loader';
import { ConfirmDialog } from './Modal';
import useOptions from './useOptions';
import AlbumQuickAdd from './AlbumQuickAdd';

interface FilterSelectProps {
  filter: FilterConfig;
  value?: string;
  onChange: (value: string) => void;
}

function FilterSelect({ filter, value, onChange }: FilterSelectProps) {
  const apiOptions = useOptions(filter.optionsFrom);
  const options = filter.options || apiOptions;
  return (
    <select className={toolField} value={value || ''} onChange={(e) => onChange(e.target.value)}>
      <option value="">{filter.label}</option>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

interface CellProps {
  col: ColumnConfig;
  row: ResourceRecord;
  onToggle: (row: ResourceRecord) => void;
}

function Cell({ col, row, onToggle }: CellProps) {
  const raw = getPath(row, col.key);
  switch (col.type) {
    case 'image': {
      const url = col.key.endsWith('Url') ? raw : getPath(row, `${col.key}Url`);
      if (typeof url !== 'string' || !url) return <span className="text-mute">—</span>;
      if (/\.pdf($|\?)/i.test(url)) return <a className="inline-block rounded bg-red-50 px-2.5 py-1.5 text-[11px] font-bold text-danger" href={url} target="_blank" rel="noreferrer">PDF</a>;
      // eslint-disable-next-line @next/next/no-img-element
      return <img className="block h-[38px] w-[52px] rounded border border-soft bg-fill object-cover" src={url} alt="" />;
    }
    case 'status':
      return (
        <button type="button" className={cx(badge(raw ? 'success' : 'off'), 'cursor-pointer hover:opacity-85')} onClick={() => onToggle(row)} title="Click to change status">
          {raw ? 'Active' : 'Inactive'}
        </button>
      );
    case 'enum': {
      const label = col.options?.find((o) => o.value === raw)?.label || (raw ? String(raw) : '—');
      return col.badge ? <span className={badge(raw === 'published' ? 'success' : 'off')}>{label}</span> : <>{label}</>;
    }
    case 'date':
      return <>{formatDate(raw)}</>;
    case 'star':
      return raw ? <span className="text-base text-yellow-600">★</span> : <>—</>;
    case 'rating':
      return <>{typeof raw === 'number' && raw > 0 ? '★'.repeat(raw) : '—'}</>;
    default:
      return <>{raw === null || raw === undefined || raw === '' ? '—' : stripHtml(raw, 70)}</>;
  }
}

interface ResourceListProps {
  moduleKey: string;
  config: ModuleConfig;
}

export default function ResourceList({ moduleKey, config }: ResourceListProps) {
  const [rows, setRows] = useState<ResourceRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [status, setStatus] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [toDelete, setToDelete] = useState<ResourceRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [albumFor, setAlbumFor] = useState<ResourceRecord | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(search.trim()); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number | undefined> = {
        page, limit, search: debounced || undefined, status: status || undefined,
      };
      Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
      const { data } = await api.get<ApiResponse<PaginatedData<ResourceRecord>>>(config.endpoint, { params });
      setRows(data.data.items);
      setPagination(data.data.pagination);
      if (data.data.items.length === 0 && page > 1) setPage(page - 1);
    } catch (err) {
      toast.error(errorMessage(err, 'Failed to load records'));
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, page, limit, debounced, status, filters]);

  useEffect(() => { load(); }, [load]);

  const setFilter = (name: string, value: string) => { setFilters((f) => ({ ...f, [name]: value })); setPage(1); };

  const reset = () => { setSearch(''); setDebounced(''); setStatus(''); setFilters({}); setPage(1); };

  const toggleStatus = async (row: ResourceRecord) => {
    try {
      const { data } = await api.patch<ApiResponse<{ id: number; status: boolean }>>(`${config.endpoint}/${row.id}/status`);
      setRows((list) => list.map((r) => (r.id === row.id ? { ...r, status: data.data.status } : r)));
      toast.success(data.message);
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const { data } = await api.delete<ApiResponse<{ id: number }>>(`${config.endpoint}/${toDelete.id}`);
      toast.success(data.message);
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const colCount = config.columns.length + 2;

  return (
    <>
      <PageHeader title={config.title}>
        <Link href={adminPath(`${moduleKey}/new`)} className={btn.primary}>+ Add New</Link>
      </PageHeader>

      <div className={card}>
        {config.tabs && (
          <div className="mb-3.5 flex flex-wrap gap-1 border-b-2 border-primary">
            {config.tabs.options.map((t) => (
              <button
                type="button"
                key={t.value}
                className={tabBtn((filters[config.tabs!.name] || '') === t.value)}
                onClick={() => setFilter(config.tabs!.name, t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <div className={toolbar}>
          <input className={toolField} placeholder="🔍 Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          {!config.noStatusFilter && (
            <select className={toolField} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          )}
          {(config.filters || []).map((f) => (
            <FilterSelect key={f.name} filter={f} value={filters[f.name]} onChange={(v) => setFilter(f.name, v)} />
          ))}
          <button type="button" className={btn.base} onClick={reset}>Reset</button>
        </div>

        <div className="overflow-x-auto">
          <table className={table}>
            <thead>
              <tr>
                <th className={cx(th, 'w-[50px]')}>#</th>
                {config.columns.map((c) => <th key={c.key} className={th}>{c.label}</th>)}
                <th className={cx(th, config.albumQuickAdd ? 'w-[180px]' : 'w-[140px]')}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={colCount}><Loader /></td></tr>}
              {!loading && rows.length === 0 && <tr><td colSpan={colCount} className={tdEmpty}>No records found</td></tr>}
              {!loading && rows.map((row, i) => (
                <tr key={row.id} className={rowHover}>
                  <td className={td}>{(page - 1) * limit + i + 1}</td>
                  {config.columns.map((c) => <td key={c.key} className={td}><Cell col={c} row={row} onToggle={toggleStatus} /></td>)}
                  <td className={cx(td, 'whitespace-nowrap')}>
                    <div className="flex gap-1.5">
                      {config.albumQuickAdd && row.imageType === 'album' && (
                        <button type="button" className={btn.plus} title="Add album" aria-label="Add album" data-add-album onClick={() => setAlbumFor(row)}>+</button>
                      )}
                      <Link href={adminPath(`${moduleKey}/${row.id}`)} className={btn.sm}>Edit</Link>
                      <button type="button" className={btn.smDanger} onClick={() => setToDelete(row)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination pagination={pagination} limit={limit} onPage={setPage} onLimit={(n) => { setLimit(n); setPage(1); }} />
      </div>

      {config.albumQuickAdd && <AlbumQuickAdd portfolio={albumFor} onClose={() => setAlbumFor(null)} onAdded={load} />}

      <ConfirmDialog
        open={!!toDelete}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this ${config.singular.toLowerCase()}? This action cannot be undone.`}
      />
    </>
  );
}
