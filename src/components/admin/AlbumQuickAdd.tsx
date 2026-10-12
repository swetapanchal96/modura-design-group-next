'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { errorMessage, fieldErrors } from '@/lib/admin/api';
import { btn, err, hint, input, label } from '@/lib/admin/ui';
import type { ApiResponse, FieldErrors, GalleryValue, PortfolioAlbum, ResourceRecord } from '@/types/admin';
import Modal from './Modal';
import { Gallery } from './FormField';

interface AlbumQuickAddProps {
  portfolio: ResourceRecord | null;
  onClose: () => void;
  onAdded: () => void;
}

const EMPTY: GalleryValue = { existing: [], added: [], removed: [] };

/** "+" action on album portfolios: add one more album (title + images) without opening the full form. */
export default function AlbumQuickAdd({ portfolio, onClose, onAdded }: AlbumQuickAddProps) {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<GalleryValue>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (portfolio) { setTitle(''); setImages(EMPTY); setErrors({}); }
  }, [portfolio]);

  const save = async () => {
    if (!portfolio) return;
    const errs: FieldErrors = {};
    if (!title.trim()) errs.title = 'Album title is required';
    if (!images.added.length) errs.images = 'Please add at least one image';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', title.trim());
      images.added.forEach((f) => fd.append('images', f));
      const { data } = await api.post<ApiResponse<PortfolioAlbum>>(`/admin/portfolios/${portfolio.id}/albums`, fd);
      toast.success(data.message);
      onAdded();
      onClose();
    } catch (err) {
      setErrors(fieldErrors(err));
      toast.error(errorMessage(err, 'Could not add album'));
    } finally {
      setSaving(false);
    }
  };

  const name = portfolio ? String(portfolio.title || `Portfolio #${portfolio.id}`) : '';
  const albumCount = portfolio?.albums?.length ?? 0;

  return (
    <Modal
      open={!!portfolio}
      onClose={onClose}
      title="Add Album"
      width={620}
      footer={(
        <>
          <button type="button" className={btn.base} onClick={onClose} disabled={saving}>Cancel</button>
          <button type="button" className={btn.primary} onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Add Album'}</button>
        </>
      )}
    >
      <p className={`${hint} mb-3`}>
        Portfolio: <b>{name}</b> · {albumCount} album{albumCount === 1 ? '' : 's'} already
      </p>
      <div className="mb-3.5">
        <label className={label}>Album Title<span className="ml-0.5 text-danger">*</span></label>
        <input
          value={title}
          maxLength={200}
          placeholder="e.g. Interior, Elevation"
          className={input(!!errors.title)}
          onChange={(e) => { setTitle(e.target.value); setErrors((x) => ({ ...x, title: undefined })); }}
        />
        {errors.title && <div className={err} data-error>{errors.title}</div>}
      </div>
      <div className="mb-3.5">
        <label className={label}>Album Images<span className="ml-0.5 text-danger">*</span></label>
        <Gallery
          value={images}
          onChange={(g) => { setImages(g); setErrors((x) => ({ ...x, images: undefined })); }}
          onError={(msg) => setErrors((x) => ({ ...x, images: msg || undefined }))}
          invalid={!!errors.images}
        />
        {errors.images && <div className={err} data-error>{errors.images}</div>}
      </div>
    </Modal>
  );
}
