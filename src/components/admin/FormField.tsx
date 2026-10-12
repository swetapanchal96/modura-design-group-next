'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from 'react';

import useOptions from './useOptions';
import { IMAGE_ACCEPT, MAX_IMAGE_MB, checkImage } from '@/lib/admin/utils';
import { btn, cx, err as errCls, hint as hintCls, input, label as labelCls } from '@/lib/admin/ui';
import type { AlbumValue, FieldConfig, FieldValue, GalleryValue, ResourceRecord, ServiceFaq } from '@/types/admin';
import RichEditor from './RichEditor';

/* ---------------- shared upload box + thumbnails ---------------- */
const dropZone = (invalid: boolean, drag = false) =>
  cx(
    'flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed p-3 text-center text-[11px] text-mute transition',
    drag ? 'border-primary bg-soft' : 'bg-fill hover:border-primary hover:bg-soft',
    invalid ? 'border-danger' : 'border-steel'
  );

function Thumb({ src, caption, captionClass, onRemove, pdf }: {
  src: string; caption: string; captionClass?: string; onRemove?: () => void; pdf?: boolean;
}) {
  return (
    <div className="relative w-24">
      {pdf
        ? <a href={src} target="_blank" rel="noreferrer" className="flex h-[72px] items-center justify-center rounded-md bg-red-50 text-xs font-bold text-danger">PDF</a>
        // eslint-disable-next-line @next/next/no-img-element
        : <img src={src} alt="" className="block h-[72px] w-24 rounded-md border border-line object-cover" />}
      <small className={cx('mt-0.5 block text-[10px] text-mute', captionClass)}>{caption}</small>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          title="Remove"
          className="absolute -top-2 -right-2 flex size-[22px] items-center justify-center rounded-full bg-danger text-[11px] text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* ---------------- Single image / file upload with preview ---------------- */
interface UploadProps {
  value: File | null;
  existingUrl?: string | null;
  onChange: (file: File) => void;
  onError: (msg: string | null) => void;
  allowPdf: boolean;
  invalid: boolean;
}

function Upload({ value, existingUrl, onChange, onError, allowPdf, invalid }: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const preview = useMemo(() => (value instanceof File ? URL.createObjectURL(value) : null), [value]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const pick = (file?: File | null) => {
    if (!file) return;
    const e = checkImage(file, { allowPdf });
    if (e) { onError(e); return; }
    onError(null);
    onChange(file);
  };

  const shownUrl = preview || existingUrl;
  const isPdf = value instanceof File ? value.type === 'application/pdf' : /\.pdf($|\?)/i.test(existingUrl || '');

  return (
    <div>
      <div
        className={dropZone(invalid, drag)}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); }}
        role="button"
        tabIndex={0}
      >
        <b className="text-xs text-primary">⬆ Drag &amp; drop or click to upload {allowPdf ? 'file' : 'image'}</b>
        <span>Single {allowPdf ? 'file' : 'image'} only · jpg, jpeg, png, webp{allowPdf ? ', pdf' : ''} · max {MAX_IMAGE_MB} MB</span>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={allowPdf ? `${IMAGE_ACCEPT},.pdf` : IMAGE_ACCEPT}
          onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ''; }}
        />
      </div>
      {shownUrl && (
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          <Thumb src={shownUrl} pdf={isPdf} caption={value instanceof File ? 'New' : 'Current'} />
        </div>
      )}
    </div>
  );
}

/* ---------------- Gallery: multiple images, or ONE image when single=true ---------------- */
interface GalleryProps {
  value: GalleryValue;
  onChange: (value: GalleryValue) => void;
  onError: (msg: string | null) => void;
  invalid: boolean;
  single?: boolean;
}

export function Gallery({ value, onChange, onError, invalid, single = false }: GalleryProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const { existing, added, removed } = value;
  const previews = useMemo(() => added.map((f) => URL.createObjectURL(f)), [added]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p)), [previews]);

  const addFiles = (list: FileList | null) => {
    const files = Array.from(list || []);
    if (!files.length) return;
    const bad = files.map((f) => checkImage(f)).find(Boolean);
    if (bad) { onError(bad); return; }
    onError(null);
    if (single) {
      // one image only: the new file replaces the current image(s)
      onChange({ existing, added: [files[0]], removed: existing.map((img) => img.id) });
    } else {
      onChange({ existing, removed, added: [...added, ...files].slice(0, 20) });
    }
  };

  const kept = existing.filter((img) => !removed.includes(img.id));

  return (
    <div>
      <div
        className={dropZone(invalid, drag)}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
        role="button"
        tabIndex={0}
      >
        <b className="text-xs text-primary">⬆ Drag &amp; drop or click to {single ? 'upload image' : 'add images'}</b>
        <span>
          {single
            ? `Single image only · jpg, jpeg, png, webp · max ${MAX_IMAGE_MB} MB`
            : `Multiple images · jpg, jpeg, png, webp · max ${MAX_IMAGE_MB} MB each · up to 20 per save`}
        </span>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple={!single}
          accept={IMAGE_ACCEPT}
          onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
        />
      </div>
      {(kept.length > 0 || added.length > 0) && (
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          {kept.map((img, i) => (
            <Thumb
              key={`e${img.id}`}
              src={img.imageUrl}
              caption={single ? 'Current' : i === 0 ? 'Cover' : 'Saved'}
              captionClass={!single && i === 0 ? 'font-semibold text-success' : undefined}
              onRemove={single ? undefined : () => onChange({ existing, added, removed: [...removed, img.id] })}
            />
          ))}
          {added.map((f, i) => (
            <Thumb
              key={`n${i}-${f.name}`}
              src={previews[i]}
              caption="New"
              onRemove={() => onChange(single
                ? { existing, added: [], removed: [] }
                : { existing, removed, added: added.filter((_, x) => x !== i) })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Portfolio albums (title + multiple images each) ---------------- */
let albumSeq = 0;
export const newAlbum = (): AlbumValue => {
  albumSeq += 1;
  return { key: `new-${Date.now()}-${albumSeq}`, title: '', existing: [], added: [], removed: [] };
};

interface AlbumsFieldProps {
  value: AlbumValue[];
  onChange: (value: AlbumValue[]) => void;
  onError: (msg: string | null) => void;
  invalid: boolean;
}

function AlbumsField({ value, onChange, onError, invalid }: AlbumsFieldProps) {
  const update = (key: string, patch: Partial<AlbumValue>) =>
    onChange(value.map((a) => (a.key === key ? { ...a, ...patch } : a)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {value.length === 0 && <p className={hintCls}>No albums yet. Click “+ Add Album”.</p>}
      {value.map((a, i) => {
        const empty = !a.title.trim() || a.existing.length - a.removed.length + a.added.length < 1;
        return (
          <div key={a.key} className={cx('rounded-md border border-l-4 border-l-secondary bg-surface/40 px-3.5 py-3', invalid && empty ? 'border-danger' : 'border-line')}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <b className="text-primary">Album {i + 1}</b>
              <div className="flex gap-1.5">
                <button type="button" className={btn.sm} onClick={() => move(i, -1)} disabled={i === 0} title="Move up">↑</button>
                <button type="button" className={btn.sm} onClick={() => move(i, 1)} disabled={i === value.length - 1} title="Move down">↓</button>
                <button type="button" className={btn.smDanger} onClick={() => onChange(value.filter((x) => x.key !== a.key))}>Remove</button>
              </div>
            </div>
            <label className={labelCls}>Album Title<span className="ml-0.5 text-danger">*</span></label>
            <input
              className={input()}
              placeholder="e.g. Lobby, Exterior, Floor Plans"
              maxLength={200}
              value={a.title}
              onChange={(e) => update(a.key, { title: e.target.value })}
            />
            <label className={cx(labelCls, 'mt-2.5')}>Album Images<span className="ml-0.5 text-danger">*</span></label>
            <Gallery
              value={{ existing: a.existing, added: a.added, removed: a.removed }}
              onChange={(g) => update(a.key, { existing: g.existing, added: g.added, removed: g.removed })}
              onError={onError}
              invalid={false}
            />
          </div>
        );
      })}
      <button type="button" className={cx(btn.sm, 'w-full py-1.5')} onClick={() => onChange([...value, newAlbum()])}>+ Add Album</button>
    </div>
  );
}

/* ---------------- FAQ repeater (Services + Software Expertise) ---------------- */
interface FaqRepeaterProps {
  value: ServiceFaq[];
  onChange: (value: ServiceFaq[]) => void;
}

function FaqRepeater({ value, onChange }: FaqRepeaterProps) {
  const update = (i: number, key: keyof ServiceFaq, v: string) =>
    onChange(value.map((row, x) => (x === i ? { ...row, [key]: v } : row)));
  return (
    <div className="rounded-md border border-dashed border-line p-3">
      {value.length === 0 && <p className={cx(hintCls, 'mb-2')}>No FAQs added yet.</p>}
      {value.map((row, i) => (
        <div className="mb-2 grid grid-cols-1 items-start gap-2 md:grid-cols-[1fr_2fr_auto]" key={i}>
          <input className={input()} placeholder="Question" value={row.question} onChange={(e) => update(i, 'question', e.target.value)} />
          <textarea className={cx(input(), 'min-h-10')} placeholder="Answer" rows={2} value={row.answer} onChange={(e) => update(i, 'answer', e.target.value)} />
          <button type="button" className={btn.sm} onClick={() => onChange(value.filter((_, x) => x !== i))} title="Remove">✕</button>
        </div>
      ))}
      <button type="button" className={btn.sm} onClick={() => onChange([...value, { question: '', answer: '' }])}>+ Add FAQ</button>
    </div>
  );
}

/* ---------------- Toggle ---------------- */
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onLabel?: string;
  offLabel?: string;
}

export function Toggle({ checked, onChange, onLabel = 'Active', offLabel = 'Inactive' }: ToggleProps) {
  return (
    <label className="mt-1.5 inline-flex cursor-pointer items-center gap-2">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="relative h-[23px] w-[42px] rounded-full bg-off transition peer-checked:bg-success after:absolute after:top-[3px] after:left-[3px] after:size-[17px] after:rounded-full after:bg-white after:transition-all peer-checked:after:left-[22px]" />
      <span className="text-[13px] text-ink">{checked ? onLabel : offLabel}</span>
    </label>
  );
}

/* ---------------- Select with static or API options ---------------- */
interface SelectFieldProps {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
}

function SelectField({ field, value, onChange, invalid }: SelectFieldProps) {
  const apiOptions = useOptions(field.optionsFrom);
  const options = field.options || apiOptions;
  return (
    <select className={input(invalid)} value={value} onChange={(e) => onChange(e.target.value)}>
      {field.default === undefined && <option value="">{field.placeholder || `Select ${field.label.toLowerCase()}`}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

/* ---------------- Value narrowing helpers ---------------- */
const asString = (v: FieldValue | undefined): string => (typeof v === 'string' ? v : '');
const asFile = (v: FieldValue | undefined): File | null => (v instanceof File ? v : null);
const asGallery = (v: FieldValue | undefined): GalleryValue =>
  v && typeof v === 'object' && 'existing' in v ? v : { existing: [], added: [], removed: [] };
// Arrays are told apart by the field type (faqs vs albums), so these casts are safe.
const asFaqs = (v: FieldValue | undefined): ServiceFaq[] => (Array.isArray(v) ? (v as ServiceFaq[]) : []);
const asAlbums = (v: FieldValue | undefined): AlbumValue[] => (Array.isArray(v) ? (v as AlbumValue[]) : []);

/* ---------------- Field wrapper ---------------- */
interface FormFieldProps {
  field: FieldConfig;
  value: FieldValue | undefined;
  onChange: (value: FieldValue) => void;
  error?: string;
  setError: (msg: string | null) => void;
  record?: ResourceRecord | null;
}

export default function FormField({ field, value, onChange, error, setError, record }: FormFieldProps) {
  if (field.type === 'section') {
    return (
      <div className="col-span-full mt-2 border-b border-soft pb-1.5 text-xs font-bold tracking-wider text-secondary uppercase">
        {field.label} {field.note && <span className="font-normal tracking-normal normal-case">{field.note}</span>}
      </div>
    );
  }

  const invalid = !!error;
  const text = asString(value);
  const common = {
    value: text,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: input(invalid),
  };
  let control: ReactNode;

  switch (field.type) {
    case 'textarea':
      control = <textarea rows={4} placeholder="Enter text..." {...common} className={cx(common.className, 'min-h-20 resize-y')} />;
      break;
    case 'code':
      control = (
        <textarea
          rows={5}
          className={cx(input(invalid), 'min-h-28 resize-y bg-surface/40 font-mono text-xs')}
          placeholder="<script> ... </script>"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
      );
      break;
    case "editor":
  control = (
    <RichEditor
      value={text}
      onChange={(html: string) => onChange(html)}
      small={field.small ?? false}
      invalid={invalid}
    />
  );
      break;
    case 'select':
      control = <SelectField field={field} value={text} onChange={onChange} invalid={invalid} />;
      break;
    case 'toggle':
      control = <Toggle checked={value === true} onChange={onChange} onLabel={field.onLabel} offLabel={field.offLabel} />;
      break;
    case 'image':
    case 'file': {
      const url = record?.[`${field.name}Url`];
      control = (
        <Upload
          value={asFile(value)}
          existingUrl={typeof url === 'string' ? url : null}
          onChange={onChange}
          onError={setError}
          allowPdf={field.type === 'file'}
          invalid={invalid}
        />
      );
      break;
    }
    case 'gallery':
      control = <Gallery value={asGallery(value)} onChange={onChange} onError={setError} invalid={invalid} single={field.single} />;
      break;
    case 'albums':
      control = <AlbumsField value={asAlbums(value)} onChange={onChange} onError={setError} invalid={invalid} />;
      break;
    case 'faqs':
      control = <FaqRepeater value={asFaqs(value)} onChange={onChange} />;
      break;
    case 'number':
      control = <input type="number" min={0} placeholder={field.placeholder || field.label} {...common} />;
      break;
    default:
      control = (
        <input
          type={field.type === 'url' ? 'url' : field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text'}
          placeholder={field.placeholder || field.label}
          maxLength={field.maxLength}
          {...common}
        />
      );
  }

  return (
    <div className={field.full ? 'col-span-full' : ''} data-field={field.name}>
      <label className={labelCls}>
        {field.label}
        {field.required && <span className="ml-0.5 text-danger">*</span>}
        {field.optional && <span className="ml-1 font-normal text-mute">(optional)</span>}
      </label>
      {control}
      {field.hint && !error && <div className={hintCls}>{field.hint}</div>}
      {error && <div className={errCls} data-error>{error}</div>}
    </div>
  );
}
