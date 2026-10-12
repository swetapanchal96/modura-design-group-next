'use client';

import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import api, { downloadFile, errorMessage } from '@/lib/admin/api';
import { formatDate } from '@/lib/admin/utils';
import { APPLICATION_STATUS } from '@/lib/admin/modules';
import {
  btn, card, cx, dateField, input, kvKey, kvRow, kvVal, label, rowHover, table, td, tdEmpty, th, toolField, toolbar,
} from '@/lib/admin/ui';
import type { ApiResponse, ApplicationStatus, JobApplication, PaginatedData, PaginationMeta } from '@/types/admin';
import PageHeader from '@/components/admin/PageHeader';
import Pagination from '@/components/admin/Pagination';
import Loader from '@/components/admin/Loader';
import Modal, { ConfirmDialog } from '@/components/admin/Modal';
import useOptions from '@/components/admin/useOptions';

interface Filters {
  search: string;
  careerId: string;
  status: string;
  from: string;
  to: string;
}

const STATUS_BG: Record<ApplicationStatus, string> = {
  new: 'bg-info', shortlisted: 'bg-success', interviewed: 'bg-warning', rejected: 'bg-danger',
};

const EMPTY: Filters = { search: '', careerId: '', status: '', from: '', to: '' };

export default function JobApplicationsPage() {
  const jobs = useOptions({ endpoint: '/admin/careers', labelKey: 'jobTitle' });
  const [rows, setRows] = useState<JobApplication[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [applied, setApplied] = useState<Filters>(EMPTY);
  const [view, setView] = useState<JobApplication | null>(null);
  const [notes, setNotes] = useState('');
  const [viewStatus, setViewStatus] = useState<ApplicationStatus>('new');
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<JobApplication | null>(null);
  const [deleting, setDeleting] = useState(false);

  // debounce the search box, other filters apply immediately
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
      const { data } = await api.get<ApiResponse<PaginatedData<JobApplication>>>('/admin/job-applications', {
        params: { ...params(), page, limit },
      });
      setRows(data.data.items);
      setPagination(data.data.pagination);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [params, page, limit]);

  useEffect(() => { load(); }, [load]);

  const set = (k: keyof Filters) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFilters((f) => ({ ...f, [k]: e.target.value }));

  const quickStatus = async (row: JobApplication, status: ApplicationStatus) => {
    try {
      const { data } = await api.patch<ApiResponse<JobApplication>>(`/admin/job-applications/${row.id}`, { status });
      setRows((list) => list.map((r) => (r.id === row.id ? { ...r, status } : r)));
      toast.success(data.message);
    } catch (err) { toast.error(errorMessage(err)); }
  };

  const openView = (row: JobApplication) => { setView(row); setNotes(row.adminNotes || ''); setViewStatus(row.status); };

  const saveView = async () => {
    if (!view) return;
    setSaving(true);
    try {
      const { data } = await api.patch<ApiResponse<JobApplication>>(`/admin/job-applications/${view.id}`, { status: viewStatus, adminNotes: notes });
      setRows((list) => list.map((r) => (r.id === view.id ? { ...r, status: viewStatus, adminNotes: notes } : r)));
      toast.success(data.message);
      setView(null);
    } catch (err) { toast.error(errorMessage(err)); } finally { setSaving(false); }
  };

  const resume = async (row: JobApplication) => {
    try { await downloadFile(`/admin/job-applications/${row.id}/resume`, `${row.name}_resume`); } catch (err) { toast.error(errorMessage(err, 'Resume not found')); }
  };

  const exportExcel = async () => {
    try { await downloadFile('/admin/job-applications/export', 'job-applications.xlsx', params()); } catch (err) { toast.error(errorMessage(err, 'Export failed')); }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const { data } = await api.delete<ApiResponse<{ id: number }>>(`/admin/job-applications/${toDelete.id}`);
      toast.success(data.message);
      setToDelete(null);
      load();
    } catch (err) { toast.error(errorMessage(err)); } finally { setDeleting(false); }
  };

  const detail: [string, string | null | undefined][] = view ? [
    ['Name', view.name], ['Email', view.email], ['Phone', view.phone], ['Job Applied For', view.career?.jobTitle || '—'],
    ['Experience', view.experience], ['Current CTC', view.currentCtc], ['Expected CTC', view.expectedCtc],
    ['Notice Period', view.noticePeriod], ['Portfolio Link', view.portfolioLink], ['Cover Letter', view.coverLetter],
    ['Applied On', formatDate(view.createdAt, true)],
  ] : [];

  return (
    <>
      <PageHeader title="List of Applied Jobs">
        <button type="button" className={btn.base} onClick={exportExcel}>⬇ Export Excel</button>
      </PageHeader>

      <div className={card}>
        <div className={toolbar}>
          <input className={toolField} placeholder="🔍 Search name, email, phone..." value={filters.search} onChange={set('search')} />
          <select className={toolField} value={filters.careerId} onChange={set('careerId')}>
            <option value="">All Jobs</option>
            {jobs.map((j) => <option key={j.value} value={j.value}>{j.label}</option>)}
          </select>
          <select className={toolField} value={filters.status} onChange={set('status')}>
            <option value="">All Status</option>
            {APPLICATION_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <input type="date" value={filters.from} onChange={set('from')} title="From date" className={dateField} />
          <input type="date" value={filters.to} onChange={set('to')} title="To date" className={dateField} />
          <button type="button" className={btn.base} onClick={() => setFilters(EMPTY)}>Reset</button>
        </div>

        <div className="overflow-x-auto">
          <table className={table}>
            <thead>
              <tr>
                {['#', 'Applicant Name', 'Email', 'Phone', 'Job Applied For', 'Experience', 'Resume', 'Applied On', 'Status', 'Actions']
                  .map((h) => <th key={h} className={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={10}><Loader /></td></tr>}
              {!loading && rows.length === 0 && <tr><td colSpan={10} className={tdEmpty}>No applications found</td></tr>}
              {!loading && rows.map((r, i) => (
                <tr key={r.id} className={rowHover}>
                  <td className={td}>{(page - 1) * limit + i + 1}</td>
                  <td className={td}>{r.name}</td>
                  <td className={td}>{r.email}</td>
                  <td className={td}>{r.phone}</td>
                  <td className={td}>{r.career?.jobTitle || '—'}</td>
                  <td className={td}>{r.experience || '—'}</td>
                  <td className={td}><button type="button" className={btn.sm} onClick={() => resume(r)}>⬇ Resume</button></td>
                  <td className={td}>{formatDate(r.createdAt)}</td>
                  <td className={td}>
                    <select
                      className={cx('rounded border-0 px-1.5 py-1 text-xs font-semibold text-white', STATUS_BG[r.status])}
                      value={r.status}
                      onChange={(e) => quickStatus(r, e.target.value as ApplicationStatus)}
                    >
                      {APPLICATION_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td className={cx(td, 'whitespace-nowrap')}>
                    <div className="flex gap-1.5">
                      <button type="button" className={btn.sm} onClick={() => openView(r)}>View</button>
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
        title="Applicant Details"
        width={600}
        footer={(
          <>
            <button type="button" className={btn.base} onClick={() => { if (view) resume(view); }}>⬇ Download Resume</button>
            <button type="button" className={btn.base} onClick={() => setView(null)}>Close</button>
            <button type="button" className={btn.primary} onClick={saveView} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </>
        )}
      >
        <div className="mb-3.5">
          {detail.map(([k, v]) => (
            <div className={kvRow} key={k}>
              <b className={kvKey}>{k}</b>
              <span className={kvVal}>{k === 'Portfolio Link' && v ? <a className="text-secondary underline" href={v} target="_blank" rel="noreferrer">{v}</a> : (v || '—')}</span>
            </div>
          ))}
        </div>
        <div className="mb-3.5">
          <label className={label}>Update Status</label>
          <select className={input()} value={viewStatus} onChange={(e) => setViewStatus(e.target.value as ApplicationStatus)}>
            {APPLICATION_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div className="mb-3.5">
          <label className={label}>Admin Notes</label>
          <textarea className={input()} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Internal notes (not visible to applicant)" />
        </div>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        message="Delete this application and its resume? This action cannot be undone."
      />
    </>
  );
}
