'use client';

import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import api, { downloadFile, errorMessage } from '@/lib/admin/api';
import { formatDate, stripHtml } from '@/lib/admin/utils';
import {
  badge, btn, card, cx, dateField, kvKey, kvRow, kvVal, rowHover, table, td, tdEmpty, th, toolField, toolbar,
} from '@/lib/admin/ui';
import type { ApiResponse, PaginatedData, PaginationMeta } from '@/types/admin';
import PageHeader from './PageHeader';
import Pagination from './Pagination';
import Loader from './Loader';
import Modal, { ConfirmDialog } from './Modal';

export interface InquiryRecord {
  id: number;
  createdAt: string;
  [key: string]: unknown;
}

interface InquiryListProps {
  title: string;
  endpoint: string;
  /** columns shown in the table */
  columns: { key: string; label: string }[];
  /** all fields shown in the View popup */
  details: { key: string; label: string; multiline?: boolean }[];
  showMailStatus?: boolean;
  excelName: string;
}

interface Filters { search: string; from: string; to: string }
const EMPTY: Filters = { search: '', from: '', to: '' };
const text = (v: unknown): string => (v === null || v === undefined || v === '' ? '—' : String(v));

/** Read-only list for website form submissions (Contact / Project inquiries). */
export default function InquiryList({ title, endpoint, columns, details, showMailStatus = false, excelName }: InquiryListProps) {
  const [rows, setRows] = useState<InquiryRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [applied, setApplied] = useState<Filters>(EMPTY);
  const [view, setView] = useState<InquiryRecord | null>(null);
  const [toDelete, setToDelete] = useState<InquiryRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setApplied(filters); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [filters]);

  const params = useCallback(
    (): Record<string, string> => Object.fromEntries(Object.entries(applied).filter(([, v]) => v)) as Record<string, string>,
    [applied]
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<ApiResponse<PaginatedData<InquiryRecord>>>(endpoint, { params: { ...params(), page, limit } });
      setRows(data.data.items);
      setPagination(data.data.pagination);
      if (data.data.items.length === 0 && page > 1) setPage(page - 1);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [endpoint, params, page, limit]);

  useEffect(() => { load(); }, [load]);

  const set = (k: keyof Filters) => (e: ChangeEvent<HTMLInputElement>) => setFilters((f) => ({ ...f, [k]: e.target.value }));

  const exportExcel = async () => {
    try { await downloadFile(`${endpoint}/export`, excelName, params()); } catch (err) { toast.error(errorMessage(err, 'Export failed')); }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const { data } = await api.delete<ApiResponse<{ id: number }>>(`${endpoint}/${toDelete.id}`);
      toast.success(data.message);
      setToDelete(null);
      load();
    } catch (err) { toast.error(errorMessage(err)); } finally { setDeleting(false); }
  };

  const colCount = columns.length + (showMailStatus ? 4 : 3);

  return (
    <>
      <PageHeader title={title}>
        <button type="button" className={btn.base} onClick={exportExcel}>⬇ Export Excel</button>
      </PageHeader>

      <div className={card}>
        <div className={toolbar}>
          <input className={toolField} placeholder="🔍 Search name, email, company, phone..." value={filters.search} onChange={set('search')} />
          <input type="date" value={filters.from} onChange={set('from')} title="From date" className={dateField} />
          <input type="date" value={filters.to} onChange={set('to')} title="To date" className={dateField} />
          <button type="button" className={btn.base} onClick={() => setFilters(EMPTY)}>Reset</button>
        </div>

        <div className="overflow-x-auto">
          <table className={table}>
            <thead>
              <tr>
                <th className={cx(th, 'w-[50px]')}>#</th>
                {columns.map((c) => <th key={c.key} className={th}>{c.label}</th>)}
                <th className={th}>Received On</th>
                {showMailStatus && <th className={th}>Email</th>}
                <th className={cx(th, 'w-[130px]')}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={colCount}><Loader /></td></tr>}
              {!loading && rows.length === 0 && <tr><td colSpan={colCount} className={tdEmpty}>No inquiries found</td></tr>}
              {!loading && rows.map((r, i) => (
                <tr key={r.id} className={rowHover}>
                  <td className={td}>{(page - 1) * limit + i + 1}</td>
                  {columns.map((c) => <td key={c.key} className={td}>{stripHtml(text(r[c.key]), 60)}</td>)}
                  <td className={td}>{formatDate(r.createdAt, true)}</td>
                  {showMailStatus && (
                    <td className={td}><span className={badge(r.mailSent ? 'success' : 'off')} title={r.mailSent ? 'Email sent to admin' : 'Email not sent (check SMTP settings)'}>{r.mailSent ? 'Sent' : 'Not sent'}</span></td>
                  )}
                  <td className={cx(td, 'whitespace-nowrap')}>
                    <div className="flex gap-1.5">
                      <button type="button" className={btn.sm} onClick={() => setView(r)}>View</button>
                      <button type="button" className={btn.smDanger} onClick={() => setToDelete(r)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pagination={pagination} limit={limit} onPage={setPage} onLimit={(n) => { setLimit(n); setPage(1); }} />
      </div>

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={`${title.replace(/ies$/, 'y')} Details`}
        width={620}
        footer={(
          <>
            {view && typeof view.email === 'string' && <a className={btn.base} href={`mailto:${view.email}`}>✉ Reply by Email</a>}
            <button type="button" className={btn.base} onClick={() => setView(null)}>Close</button>
          </>
        )}
      >
        {view && (
          <div className="mb-3.5">
            {details.map((d) => (
              <div className={kvRow} key={d.key}>
                <b className={kvKey}>{d.label}</b>
                <span className={kvVal}>{text(view[d.key])}</span>
              </div>
            ))}
            <div className={kvRow}><b className={kvKey}>Received On</b><span className={kvVal}>{formatDate(view.createdAt, true)}</span></div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        message="Delete this inquiry? This action cannot be undone."
      />
    </>
  );
}
