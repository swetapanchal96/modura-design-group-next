'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/admin/api';
import { adminPath } from '@/lib/admin/paths';
import { btn, card } from '@/lib/admin/ui';
import type { ApiResponse, FieldConfig, FieldErrors, SeoPage } from '@/types/admin';
import PageHeader from '@/components/admin/PageHeader';
import Loader from '@/components/admin/Loader';
import FormField from '@/components/admin/FormField';

type SeoField = 'pageName' | 'metaTitle' | 'metaKeyword' | 'metaDescription' | 'headScript' | 'bodyScript';
type SeoValues = Record<SeoField, string>;

const FIELDS: (FieldConfig & { name: SeoField })[] = [
  { name: 'pageName', label: 'Page Name', type: 'text', required: true, full: true, maxLength: 150 },
  { name: 'metaTitle', label: 'Meta Title', type: 'text', maxLength: 255 },
  { name: 'metaKeyword', label: 'Meta Keyword', type: 'text', maxLength: 500 },
  { name: 'metaDescription', label: 'Meta Description', type: 'editor', small: true, full: true },
  { name: 'headScript', label: 'Head', type: 'code', hint: 'Scripts / tags injected inside <head> (e.g. Google Analytics)' },
  { name: 'bodyScript', label: 'Body', type: 'code', hint: 'Scripts injected at start of <body> (e.g. GTM noscript)' },
];

export default function SeoEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [values, setValues] = useState<SeoValues | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get<ApiResponse<SeoPage>>(`/admin/seo/${id}`)
      .then(({ data }) => {
        const page = data.data;
        setValues(Object.fromEntries(FIELDS.map((f) => [f.name, page[f.name] ?? ''])) as SeoValues);
      })
      .catch((err: unknown) => { toast.error(errorMessage(err, 'Page not found')); router.replace(adminPath('/seo')); });
  }, [id, router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values) return;
    if (!values.pageName.trim()) { setErrors({ pageName: 'Page Name is required' }); return; }
    setSaving(true);
    try {
      const { data } = await api.put<ApiResponse<SeoPage>>(`/admin/seo/${id}`, values);
      toast.success(data.message);
      router.push(adminPath('/seo'));
    } catch (e2) {
      setErrors(fieldErrors(e2));
      toast.error(errorMessage(e2));
    } finally { setSaving(false); }
  };

  return (
    <>
      <PageHeader title="SEO Setup › Edit Page SEO" crumb="SEO Setup">
        <Link href={adminPath('/seo')} className={btn.base}>← Back to List</Link>
      </PageHeader>
      {!values ? <div className={card}><Loader /></div> : (
        <form className={card} onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            {FIELDS.map((f) => (
              <FormField
                key={f.name}
                field={f}
                value={values[f.name]}
                error={errors[f.name]}
                onChange={(v) => {
                  setValues((s) => (s ? { ...s, [f.name]: typeof v === 'string' ? v : '' } : s));
                  setErrors((x) => ({ ...x, [f.name]: undefined }));
                }}
                setError={() => {}}
              />
            ))}
          </div>
          <div className="mt-5 flex justify-end gap-2.5 border-t border-soft pt-3.5">
            <Link href={adminPath('/seo')} className={btn.base}>Cancel</Link>
            <button type="submit" className={btn.primary} disabled={saving}>{saving ? 'Saving...' : 'Update'}</button>
          </div>
        </form>
      )}
    </>
  );
}
