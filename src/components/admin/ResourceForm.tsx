'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/admin/api';
import { isBlankHtml } from '@/lib/admin/utils';
import { adminPath } from '@/lib/admin/paths';
import { btn, card } from '@/lib/admin/ui';
import type {
  AlbumValue, ApiResponse, FieldConfig, FieldErrors, FieldValue, FormValues, GalleryValue, ModuleConfig, ResourceRecord, ServiceFaq,
} from '@/types/admin';
import FormField, { newAlbum } from './FormField';
import PageHeader from './PageHeader';
import Loader from './Loader';

const inputFields = (fields: FieldConfig[]): FieldConfig[] => fields.filter((f) => f.type !== 'section');

const EMPTY_GALLERY: GalleryValue = { existing: [], added: [], removed: [] };
const isGallery = (v: FieldValue | undefined): v is GalleryValue => !!v && typeof v === 'object' && 'existing' in v;
const asFaqs = (v: FieldValue | undefined): ServiceFaq[] => (Array.isArray(v) ? (v as ServiceFaq[]) : []);
const asAlbums = (v: FieldValue | undefined): AlbumValue[] => (Array.isArray(v) ? (v as AlbumValue[]) : []);

/** true when the field should be shown (and validated / sent) for the current values. */
const isVisible = (f: FieldConfig, values: FormValues): boolean =>
  !f.showWhen || values[f.showWhen.field] === f.showWhen.value;

function emptyValue(f: FieldConfig): FieldValue {
  if (f.type === 'toggle') return typeof f.default === 'boolean' ? f.default : true;
  if (f.type === 'gallery') return { ...EMPTY_GALLERY };
  if (f.type === 'faqs') return [];
  if (f.type === 'albums') return [newAlbum()];
  if (f.type === 'image' || f.type === 'file') return null;
  return f.default !== undefined ? String(f.default) : '';
}

function fromRecord(f: FieldConfig, record: ResourceRecord): FieldValue {
  const v = record[f.name];
  if (f.type === 'toggle') return !!v;
  if (f.type === 'gallery') return { existing: record.images || [], added: [], removed: [] };
  if (f.type === 'faqs') return (record.faqs || []).map(({ question, answer }) => ({ question, answer }));
  if (f.type === 'albums') {
    const albums = (record.albums || []).map((a): AlbumValue => ({
      key: `db-${a.id}`, id: a.id, title: a.title, existing: a.images || [], added: [], removed: [],
    }));
    return albums.length ? albums : [newAlbum()];
  }
  if (f.type === 'image' || f.type === 'file') return null;
  if ((v === null || v === undefined || v === '') && f.default !== undefined) return String(f.default);
  const str = v === null || v === undefined ? '' : String(v);
  // a saved value that is no longer an option (e.g. old "our_work" type) → empty, so the admin picks a new one
  if (f.type === 'select' && f.options && str && !f.options.some((o) => o.value === str)) return '';
  return str;
}

const scrollToFirstError = () =>
  setTimeout(() => document.querySelector('[data-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);

interface ResourceFormProps {
  moduleKey: string;
  config: ModuleConfig;
  id?: string;
}

export default function ResourceForm({ moduleKey, config, id }: ResourceFormProps) {
  const router = useRouter();
  const isEdit = !!id;
  const fields = useMemo(() => inputFields(config.fields), [config.fields]);
  const [values, setValues] = useState<FormValues>(() => Object.fromEntries(fields.map((f) => [f.name, emptyValue(f)])));
  const [record, setRecord] = useState<ResourceRecord | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return undefined;
    let alive = true;
    api.get<ApiResponse<ResourceRecord>>(`${config.endpoint}/${id}`)
      .then(({ data }) => {
        if (!alive) return;
        setRecord(data.data);
        setValues(Object.fromEntries(fields.map((f) => [f.name, fromRecord(f, data.data)])));
      })
      .catch((err: unknown) => {
        toast.error(errorMessage(err, 'Record not found'));
        router.replace(adminPath(moduleKey));
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [id, config.endpoint, fields, moduleKey, router]);

  const setValue = (name: string, v: FieldValue) => {
    setValues((s) => ({ ...s, [name]: v }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };
  const setFieldError = (name: string, msg: string | null) => setErrors((e) => ({ ...e, [name]: msg || undefined }));

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    for (const f of fields) {
      if (!isVisible(f, values)) continue;
      const v = values[f.name];
      const text = typeof v === 'string' ? v : '';
      if (f.type === 'albums') {
        const albums = asAlbums(v);
        if (!albums.length) { errs[f.name] = 'Please add at least one album'; continue; }
        const bad = albums.findIndex((a) => !a.title.trim());
        if (bad >= 0) { errs[f.name] = `Album ${bad + 1}: title is required`; continue; }
        const empty = albums.findIndex((a) => a.existing.filter((img) => !a.removed.includes(img.id)).length + a.added.length < 1);
        if (empty >= 0) { errs[f.name] = `Album ${empty + 1}: please add at least one image`; continue; }
        continue;
      }
      if (f.required) {
        if (f.type === 'image' || f.type === 'file') {
          if (!(v instanceof File) && !record?.[`${f.name}Url`]) errs[f.name] = `${f.label} is required`;
        } else if (f.type === 'gallery') {
          const g = isGallery(v) ? v : EMPTY_GALLERY;
          const kept = g.existing.filter((img) => !g.removed.includes(img.id)).length;
          if (kept + g.added.length < 1) errs[f.name] = 'Please add at least one image';
        } else if (f.type === 'editor') {
          if (isBlankHtml(text)) errs[f.name] = `${f.label} is required`;
        } else if (f.type !== 'toggle' && text.trim() === '') {
          errs[f.name] = `${f.label} is required`;
        }
      }
      if (f.type === 'url' && text && !/^https?:\/\/\S+$/i.test(text)) errs[f.name] = 'Enter a valid URL starting with http:// or https://';
      if (f.type === 'email' && text && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text)) errs[f.name] = 'Enter a valid email address';
      if (f.type === 'faqs' && asFaqs(v).some((r) => (r.question.trim() || r.answer.trim()) && !(r.question.trim() && r.answer.trim()))) {
        errs[f.name] = 'Each FAQ needs both a question and an answer';
      }
    }
    return errs;
  }

  function buildFormData(): FormData {
    const fd = new FormData();
    for (const f of fields) {
      if (!isVisible(f, values)) continue;
      const v = values[f.name];
      switch (f.type) {
        case 'image':
        case 'file':
          if (v instanceof File) fd.append(f.name, v);
          break;
        case 'gallery': {
          const g = isGallery(v) ? v : EMPTY_GALLERY;
          g.added.forEach((file) => fd.append('gallery', file));
          if (isEdit) fd.append('removeImages', JSON.stringify(g.removed));
          break;
        }
        case 'faqs':
          fd.append('faqs', JSON.stringify(asFaqs(v).filter((r) => r.question.trim() && r.answer.trim())));
          break;
        case 'albums': {
          // album i → files in "albumImages_i" (the API matches them by fileKey)
          const albums = asAlbums(v);
          fd.append('albums', JSON.stringify(albums.map((a, i) => ({
            id: a.id, title: a.title.trim(), fileKey: String(i), removeImages: a.removed,
          }))));
          albums.forEach((a, i) => a.added.forEach((file) => fd.append(`albumImages_${i}`, file)));
          break;
        }
        case 'toggle':
          fd.append(f.name, v ? 'true' : 'false');
          break;
        default:
          fd.append(f.name, typeof v === 'string' ? v : '');
      }
    }
    return fd;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error('Please fix the highlighted fields');
      scrollToFirstError();
      return;
    }
    setSaving(true);
    try {
      const fd = buildFormData();
      const { data } = isEdit
        ? await api.put<ApiResponse<ResourceRecord>>(`${config.endpoint}/${id}`, fd)
        : await api.post<ApiResponse<ResourceRecord>>(config.endpoint, fd);
      toast.success(data.message);
      router.push(adminPath(moduleKey));
    } catch (err) {
      const fe = fieldErrors(err);
      if (Object.keys(fe).length) {
        setErrors(fe);
        scrollToFirstError();
      }
      toast.error(errorMessage(err, 'Save failed'));
    } finally {
      setSaving(false);
    }
  }

  const title = `${config.title} › ${isEdit ? 'Edit' : 'Add New'}`;

  return (
    <>
      <PageHeader title={title}>
        <Link href={adminPath(moduleKey)} className={btn.base}>← Back to List</Link>
      </PageHeader>
      {loading ? <div className={card}><Loader /></div> : (
        <form className={card} onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            {config.fields.filter((f) => isVisible(f, values)).map((f, i) => (
              <FormField
                key={f.type === 'section' ? `sec${i}` : f.name}
                field={f}
                value={values[f.name]}
                record={record}
                error={errors[f.name]}
                onChange={(v) => setValue(f.name, v)}
                setError={(msg) => setFieldError(f.name, msg)}
              />
            ))}
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-2.5 border-t border-soft pt-3.5">
            <Link href={adminPath(moduleKey)} className={btn.base}>Cancel</Link>
            <button type="submit" className={btn.primary} disabled={saving}>{saving ? 'Saving...' : isEdit ? 'Update' : 'Save'}</button>
          </div>
        </form>
      )}
    </>
  );
}
