'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/admin/api';
import { adminPath } from '@/lib/admin/paths';
import { btn, card, err, hint, input, label } from '@/lib/admin/ui';
import type { ApiResponse, FieldErrors } from '@/types/admin';
import PageHeader from '@/components/admin/PageHeader';

const RULE = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EMPTY: PasswordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
const FIELDS: [keyof PasswordForm, string][] = [
  ['currentPassword', 'Current Password'],
  ['newPassword', 'New Password'],
  ['confirmPassword', 'Confirm New Password'],
];

export default function ChangePasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState<PasswordForm>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!form.currentPassword) errs.currentPassword = 'Current password is required';
    if (!form.newPassword) errs.newPassword = 'New password is required';
    else if (!RULE.test(form.newPassword)) errs.newPassword = 'Min 8 characters with 1 uppercase, 1 number and 1 special character';
    if (form.newPassword && form.confirmPassword !== form.newPassword) errs.confirmPassword = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const { data } = await api.put<ApiResponse<null>>('/admin/auth/change-password', form);
      toast.success(data.message);
      setForm(EMPTY);
      router.push(adminPath('/dashboard'));
    } catch (e2) {
      setErrors(fieldErrors(e2));
      toast.error(errorMessage(e2));
    } finally { setSaving(false); }
  };

  return (
    <>
      <PageHeader title="Change Password" />
      <form className={`${card} max-w-[520px]`} onSubmit={onSubmit} noValidate>
        {FIELDS.map(([k, text]) => (
          <div className="mb-3.5" key={k}>
            <label className={label}>{text}<span className="ml-0.5 text-danger">*</span></label>
            <input
              type="password"
              autoComplete={k === 'currentPassword' ? 'current-password' : 'new-password'}
              placeholder="••••••••"
              value={form[k]}
              className={input(!!errors[k])}
              onChange={(e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: undefined })); }}
            />
            {errors[k] && <div className={err} data-error>{errors[k]}</div>}
          </div>
        ))}
        <p className={hint}>Min 8 characters, 1 uppercase, 1 number, 1 special character</p>
        <div className="mt-5 flex justify-end gap-2.5 border-t border-soft pt-3.5">
          <button type="button" className={btn.base} onClick={() => router.push(adminPath('/dashboard'))}>Cancel</button>
          <button type="submit" className={btn.primary} disabled={saving}>{saving ? 'Updating...' : 'Update Password'}</button>
        </div>
      </form>
    </>
  );
}
