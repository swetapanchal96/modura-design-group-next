'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage } from '@/lib/admin/api';
import { formatDate } from '@/lib/admin/utils';
import { adminPath } from '@/lib/admin/paths';
import { btn, card, cx, hint, rowHover, table, td, tdEmpty, th, toolField, toolbar } from '@/lib/admin/ui';
import type { ApiResponse, SeoPage } from '@/types/admin';
import PageHeader from '@/components/admin/PageHeader';
import Loader from '@/components/admin/Loader';

export default function SeoListPage() {
  const [rows, setRows] = useState<SeoPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      api.get<ApiResponse<SeoPage[]>>('/admin/seo', { params: { search: search.trim() || undefined } })
        .then(({ data }) => setRows(data.data))
        .catch((err: unknown) => toast.error(errorMessage(err)))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <>
      <PageHeader title="SEO Setup" />
      <div className={card}>
        <p className={cx(hint, 'mb-2.5')}>Pages are fixed. You can only edit the SEO settings of each page.</p>
        <div className={toolbar}>
          <input className={toolField} placeholder="🔍 Search page..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="button" className={btn.base} onClick={() => setSearch('')}>Reset</button>
        </div>
        <div className="overflow-x-auto">
          <table className={table}>
            <thead>
              <tr>
                <th className={cx(th, 'w-[50px]')}>#</th><th className={th}>Page Name</th><th className={th}>Meta Title</th>
                <th className={th}>Last Updated</th><th className={cx(th, 'w-[100px]')}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5}><Loader /></td></tr>}
              {!loading && rows.length === 0 && <tr><td colSpan={5} className={tdEmpty}>No pages found. Run <code>npm run seed</code> in the backend.</td></tr>}
              {!loading && rows.map((r, i) => (
                <tr key={r.id} className={rowHover}>
                  <td className={td}>{i + 1}</td>
                  <td className={td}>{r.pageName}</td>
                  <td className={td}>{r.metaTitle || '—'}</td>
                  <td className={td}>{formatDate(r.updatedAt, true)}</td>
                  <td className={td}><Link href={adminPath(`/seo/${r.id}`)} className={btn.smPrimary}>✎ Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
