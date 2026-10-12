'use client';

import { useEffect, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/api';
import { formatDate } from '@/lib/admin/utils';
import { btn, card, cx, err, hint, input, label } from '@/lib/admin/ui';
import type { ApiResponse, FieldErrors, HomeCounter } from '@/types/admin';
import PageHeader from '@/components/admin/PageHeader';
import Loader from '@/components/admin/Loader';

type CounterKey = 'projectCompleted' | 'happyClient' | 'qualifiedEngineers' | 'yearsExperience' | 'countriesServed';
type CounterValues = Record<CounterKey, string>;

const FIELDS: { name: CounterKey; label: string }[] = [
  { name: 'projectCompleted', label: 'Project Completed' },
  { name: 'happyClient', label: 'Happy Client' },
  { name: 'qualifiedEngineers', label: 'Qualified Engineers' },
  { name: 'yearsExperience', label: 'Years Experience' },
  { name: 'countriesServed', label: 'Countries Served' },
];

const toValues = (c: HomeCounter): CounterValues =>
  Object.fromEntries(FIELDS.map((f) => [f.name, String(c[f.name] ?? 0)])) as CounterValues;

export default function HomeCounterPage() {
  const [values, setValues] = useState<CounterValues | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | undefined>();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get<ApiResponse<HomeCounter>>('/admin/home-counter')
      .then(({ data }) => { setValues(toValues(data.data)); setUpdatedAt(data.data.updatedAt); })
      .catch((err: unknown) => toast.error(errorMessage(err, 'Failed to load home counter')));
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values) return;
    const errs: FieldErrors = {};
    for (const f of FIELDS) {
      if (!/^\d+$/.test(values[f.name].trim())) errs[f.name] = `${f.label} must be a whole number (0 or more)`;
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const payload = Object.fromEntries(FIELDS.map((f) => [f.name, Number(values[f.name].trim())]));
      const { data } = await api.put<ApiResponse<HomeCounter>>('/admin/home-counter', payload);
      setValues(toValues(data.data));
      setUpdatedAt(data.data.updatedAt);
      toast.success(data.message);
    } catch (err) {
      setErrors(fieldErrors(err));
      toast.error(errorMessage(err));
    } finally { setSaving(false); }
  };

  return (
    <>
      <PageHeader title="Home Counter" />
      {!values ? <div className={card}><Loader /></div> : (
        <form className={card} onSubmit={onSubmit} noValidate>
          <p className={cx(hint, 'mb-3.5')}>
            These numbers are shown in the counter section of the website home page.
            {updatedAt && <> Last updated: {formatDate(updatedAt, true)}</>}
          </p>
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.name}>
                <label className={label}>{f.label}<span className="ml-0.5 text-danger">*</span></label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  inputMode="numeric"
                  value={values[f.name]}
                  className={input(!!errors[f.name])}
                  onChange={(e) => {
                    setValues((v) => (v ? { ...v, [f.name]: e.target.value } : v));
                    setErrors((x) => ({ ...x, [f.name]: undefined }));
                  }}
                />
                {errors[f.name] && <div className={err} data-error>{errors[f.name]}</div>}
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end gap-2.5 border-t border-soft pt-3.5">
            <button type="submit" className={btn.primary} disabled={saving}>{saving ? 'Saving...' : 'Update'}</button>
          </div>
        </form>
      )}
    </>
  );
}
