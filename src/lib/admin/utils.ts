export const MAX_IMAGE_MB = 8;
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const IMAGE_ACCEPT = '.jpg,.jpeg,.png,.webp';

/** Reads nested values like "category.name" or "images.0.imageUrl". */
export const getPath = (obj: unknown, path: string): unknown =>
  path.split('.').reduce<unknown>(
    (o, k) => (o !== null && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined),
    obj
  );

export const formatDate = (v: unknown, withTime = false): string => {
  if (!v) return '—';
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-IN', withTime
    ? { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { day: '2-digit', month: 'short', year: 'numeric' });
};

/** Validates an image File on the client (type + size). Returns an error string or null. */
export function checkImage(file: File | null | undefined, { allowPdf = false, maxMb = MAX_IMAGE_MB } = {}): string | null {
  if (!file) return null;
  const ok = IMAGE_TYPES.includes(file.type) || (allowPdf && file.type === 'application/pdf');
  if (!ok) return allowPdf ? 'Only jpg, jpeg, png, webp or pdf allowed' : 'Only jpg, jpeg, png, webp images allowed';
  if (file.size > maxMb * 1024 * 1024) return `File must be ${maxMb} MB or smaller`;
  return null;
}

/** true when rich text HTML has no visible text. */
export const isBlankHtml = (html: unknown): boolean =>
  !String(html || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

export const stripHtml = (html: unknown, max = 80): string => {
  const t = String(html ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
};
