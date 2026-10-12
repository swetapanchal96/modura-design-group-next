'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useAuth } from '@/lib/admin/auth';
import { NAV } from '@/lib/admin/modules';
import { adminPath } from '@/lib/admin/paths';
import { cx } from '@/lib/admin/ui';
import Loader from './Loader';

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

const titleFor = (pathname: string): string => {
  for (const g of NAV) for (const i of g.items) if (isActive(pathname, i.href)) return i.label;
  return 'Admin';
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const { admin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !admin && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [loading, admin, isLoginPage, router]);

  useEffect(() => {
    if (!loading && !admin) router.replace(adminPath('/login'));
  }, [loading, admin, router]);

  useEffect(() => { setMenuOpen(false); setProfileOpen(false); }, [pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

    if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !admin) {
    return <div className="flex min-h-screen items-center justify-center p-4"><Loader text="Loading admin panel..." /></div>;
  }

  const initials = (admin.name || 'A').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  

  return (
    <div className="min-h-screen">
      {/* ---------- Sidebar ---------- */}
      <aside
        className={cx(
          'fixed inset-y-0 left-0 z-30 w-[250px] overflow-y-auto bg-primary transition-transform md:translate-x-0',
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Link href={adminPath('/dashboard')} className="flex items-center gap-2.5 border-b-3 border-secondary bg-white px-4 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.jpg" alt="Modura" className="h-auto w-[46px]" />
          <div>
            <b className="block text-[17px] tracking-[3px] text-primary">MODURA</b>
            <small className="block text-[9px] tracking-[2.5px] text-secondary">DESIGN GROUP</small>
          </div>
        </Link>
        <nav className="pb-6">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="px-5 pt-4 pb-1.5 text-[10px] tracking-[1.5px] text-steel uppercase">{g.group}</div>
              {g.items.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className={cx(
                    'block border-l-4 px-5 py-2.5 text-[13px]',
                    isActive(pathname, i.href)
                      ? 'border-white bg-secondary font-semibold text-white'
                      : 'border-transparent text-white/85 hover:bg-primary-600 hover:text-white'
                  )}
                >
                  {i.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      {menuOpen && <div className="fixed inset-0 z-20 bg-primary/45 md:hidden" onClick={() => setMenuOpen(false)} />}

      {/* ---------- Main ---------- */}
      <div className="min-h-screen md:ml-[250px]">
        <header className="sticky top-0 z-10 flex h-[58px] items-center justify-between border-b border-line bg-white px-4 shadow-sm md:px-6">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="rounded-md border border-secondary px-2.5 py-1 text-primary md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              ☰
            </button>
            <strong className="text-primary">{titleFor(pathname)}</strong>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="hidden text-xs text-secondary hover:underline sm:inline">View website ↗</a>
            <div className="relative" ref={profileRef}>
              <button type="button" className="flex items-center gap-2 text-primary" onClick={() => setProfileOpen((v) => !v)}>
                <span className="flex size-[34px] items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{initials}</span>
                <span className="hidden sm:inline">{admin.name}</span> ▾
              </button>
              {profileOpen && (
                <div className="absolute top-12 right-0 w-[210px] overflow-hidden rounded-md border border-line bg-white shadow-lg">
                  <div className="border-b border-soft px-3 py-2.5 text-xs break-all text-mute">{admin.email}</div>
                  <Link href={adminPath('/change-password')} className="block px-3 py-2.5 text-[13px] text-ink hover:bg-fill">Change Password</Link>
                  <button type="button" onClick={logout} className="block w-full px-3 py-2.5 text-left text-[13px] text-ink hover:bg-fill">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
