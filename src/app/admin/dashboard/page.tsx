'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage } from '@/lib/admin/api';
import { formatDate } from '@/lib/admin/utils';
import { APPLICATION_STATUS } from '@/lib/admin/modules';
import { adminPath } from '@/lib/admin/paths';
import { badge, btn, card, cx, table, td, th } from '@/lib/admin/ui';
import type { ApiResponse, DashboardData } from '@/types/admin';
import PageHeader from '@/components/admin/PageHeader';
import Loader from '@/components/admin/Loader';

const QUICK: [string, string][] = [
  ['/services/new', '+ Service'], ['/portfolios/new', '+ Portfolio'], ['/blogs/new', '+ Blog'],
  ['/careers/new', '+ Career'], ['/testimonials/new', '+ Testimonial'], ['/seo', 'SEO Setup'],
];

const STATUS_TONE = { new: 'info', shortlisted: 'success', interviewed: 'warning', rejected: 'danger' } as const;

interface StatCard {
  icon: string;
  label: string;
  value: number;
  href: string;
  extra?: string | null;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.get<ApiResponse<DashboardData>>('/admin/dashboard')
      .then(({ data: res }) => setData(res.data))
      .catch((err: unknown) => toast.error(errorMessage(err, 'Failed to load dashboard')));
  }, []);

  if (!data) return <><PageHeader title="Dashboard" /><div className={card}><Loader /></div></>;

  const { counts } = data;
  const stats: StatCard[] = [
    { icon: '▦', label: 'Services', value: counts.services, href: '/services' },
    { icon: '◧', label: 'Portfolio Items', value: counts.portfolios, href: '/portfolios' },
    { icon: '✎', label: 'Blog Posts', value: counts.blogs, href: '/blogs' },
    {
      icon: '✉', label: 'Job Applications', value: counts.applications, href: '/job-applications',
      extra: counts.newApplications ? `${counts.newApplications} new` : null,
    },
    { icon: '☎', label: 'Contact Inquiries', value: counts.contactInquiries, href: '/contact-inquiries' },
    { icon: '◎', label: 'Project Inquiries', value: counts.projectInquiries, href: '/project-inquiries' },
    { icon: '✋', label: 'Get in Touch', value: counts.getInTouchInquiries, href: '/get-in-touch-inquiries' },
  ];

  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="mb-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <Link
            href={adminPath(s.href)}
            key={s.label}
            data-stat
            className="flex items-center gap-3 rounded-lg border border-l-4 border-line border-l-secondary bg-white p-4 text-ink transition hover:shadow-md"
          >
            <div className="flex size-[42px] flex-none items-center justify-center rounded-lg bg-primary text-lg text-white">{s.icon}</div>
            <div>
              <b className="block text-[22px] text-primary">{s.value}</b>
              {s.label}
              {s.extra && <em className="ml-1.5 rounded-full bg-info px-1.5 py-px text-[10px] text-white not-italic">{s.extra}</em>}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className={card}>
          <h3 className="mb-3 text-[15px] font-semibold text-primary">Recent Job Applications</h3>
          <div className="overflow-x-auto">
            <table className={cx(table, 'min-w-0')}>
              <thead><tr><th className={th}>Name</th><th className={th}>Job</th><th className={th}>Status</th><th className={th}>Date</th></tr></thead>
              <tbody>
                {data.recentApplications.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-mute">No applications yet</td></tr>}
                {data.recentApplications.map((a) => (
                  <tr key={a.id}>
                    <td className={td}>{a.name}</td>
                    <td className={td}>{a.career?.jobTitle || '—'}</td>
                    <td className={td}><span className={badge(STATUS_TONE[a.status])}>{APPLICATION_STATUS.find((s) => s.value === a.status)?.label}</span></td>
                    <td className={td}>{formatDate(a.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2.5"><Link href={adminPath('/job-applications')} className="text-secondary hover:underline">View all →</Link></p>
        </div>

        <div className={card}>
          <h3 className="mb-3 text-[15px] font-semibold text-primary">Quick Links</h3>
          <div className="flex flex-wrap gap-2">
            {QUICK.map(([href, text]) => <Link key={href} href={adminPath(href)} className={btn.base}>{text}</Link>)}
          </div>
          <h3 className="mt-5 mb-3 text-[15px] font-semibold text-primary">Recent Blog Posts</h3>
          {data.recentBlogs.length === 0 && <p className="text-xs text-mute">No blog posts yet</p>}
          {data.recentBlogs.map((b) => (
            <div className="flex items-center justify-between gap-2 border-b border-soft py-2" key={b.id}>
              <Link href={adminPath(`/blogs/${b.id}`)} className="text-secondary hover:underline">{b.title}</Link>
              <span className={badge(b.status === 'published' ? 'success' : 'off')}>{b.status === 'published' ? 'Published' : 'Draft'}</span>
            </div>
          ))}
          <p className="mt-2.5 text-xs text-mute">Active job openings: <b>{counts.activeJobs}</b></p>
        </div>
      </div>
    </>
  );
}
