'use client';

import type { PaginationMeta } from '@/types/admin';
import { cx } from '@/lib/admin/ui';

interface PaginationProps {
  pagination: PaginationMeta | null;
  limit: number;
  onPage: (page: number) => void;
  onLimit: (limit: number) => void;
}

const pageBtn = 'min-w-8 rounded border border-line bg-white px-2.5 py-1 text-xs text-primary hover:bg-fill disabled:cursor-not-allowed disabled:opacity-50';

export default function Pagination({ pagination, onPage, limit, onLimit }: PaginationProps) {
  if (!pagination) return null;
  const { page, totalPages, total } = pagination;
  const from = total ? (page - 1) * limit + 1 : 0;
  const to = Math.min(page * limit, total);

  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let p = start; p <= end; p += 1) pages.push(p);

  return (
    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-mute">
      <div>
        Show{' '}
        <select value={limit} onChange={(e) => onLimit(Number(e.target.value))} className="rounded border border-line bg-white px-1.5 py-1">
          {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>{' '}
        entries · Showing {from}–{to} of {total}
      </div>
      <div className="flex gap-1">
        <button type="button" className={pageBtn} disabled={page <= 1} onClick={() => onPage(page - 1)}>‹</button>
        {pages.map((p) => (
          <button
            type="button"
            key={p}
            className={cx(pageBtn, p === page && 'border-primary bg-primary text-white hover:bg-primary')}
            onClick={() => onPage(p)}
          >
            {p}
          </button>
        ))}
        <button type="button" className={pageBtn} disabled={page >= totalPages} onClick={() => onPage(page + 1)}>›</button>
      </div>
    </div>
  );
}
