'use client';

import { Suspense, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/admin/auth';
import { errorMessage, fieldErrors } from '@/lib/admin/api';
import { adminPath } from '@/lib/admin/paths';
import { btn, cx, err, input, label } from '@/lib/admin/ui';
import type { FieldErrors } from '@/types/admin';
import logo from '@/app/(website)/assets/images/modura-logo-new.jpeg'

interface LoginFormState {
  email: string;
  password: string;
}

function LoginForm() {
  const { admin, loading, login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => { if (!loading && admin) router.replace(adminPath('/dashboard')); }, [loading, admin, router]);
  useEffect(() => { if (params.get('expired')) toast.error('Session expired, please login again', { id: 'expired' }); }, [params]);

  const set = (k: keyof LoginFormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      toast.success('Welcome back!');
      router.replace(adminPath('/dashboard'));
    } catch (e2) {
      setErrors(fieldErrors(e2));
      toast.error(errorMessage(e2, 'Login failed'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-linear-135 from-primary to-secondary p-4">
      <form className="w-full max-w-[400px] rounded-xl bg-white p-8 shadow-2xl" onSubmit={onSubmit} noValidate>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mx-auto mb-3.5 block w-[170px]" src={logo.src} alt="Modura Design Group" />
        <h2 className="mb-5 text-center text-xl font-semibold text-primary">Admin Login</h2>
        <div className="mb-3.5">
          <label className={label}>Email / Username<span className="ml-0.5 text-danger">*</span></label>
          <input type="email" autoComplete="username" placeholder="admin@admin.com" value={form.email} onChange={set('email')} className={input(!!errors.email)} />
          {errors.email && <div className={err}>{errors.email}</div>}
        </div>
        <div className="mb-5">
          <label className={label}>Password<span className="ml-0.5 text-danger">*</span></label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={set('password')}
              className={cx(input(!!errors.password), 'pr-16')}
            />
            <button type="button" className="absolute inset-y-1 right-1 px-2.5 text-xs text-secondary" onClick={() => setShowPw((v) => !v)}>
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <div className={err}>{errors.password}</div>}
        </div>
        <button type="submit" className={cx(btn.primary, 'w-full py-3')} disabled={submitting}>{submitting ? 'Signing in...' : 'LOGIN'}</button>
        <p className="mt-4 text-center text-xs"><a href="/" className="text-secondary hover:underline">← Back to website</a></p>
      </form>
    </section>
  );
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginForm /></Suspense>;
}
