'use client';

import { useEffect, type ReactNode } from 'react';
import { btn } from '@/lib/admin/ui';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
}

export default function Modal({ open, onClose, title, children, footer, width = 520 }: ModalProps) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="max-h-[90vh] w-full overflow-auto rounded-lg bg-white px-5 py-5 shadow-xl" style={{ maxWidth: width }} role="dialog" aria-modal="true">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary">{title}</h3>
          <button type="button" className="rounded px-2 py-1 text-base text-mute hover:bg-fill" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div>{children}</div>
        {footer ? <div className="mt-5 flex flex-wrap justify-end gap-2.5 border-t border-soft pt-3.5">{footer}</div> : null}
      </div>
    </div>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
  confirmText?: string;
}

export function ConfirmDialog({ open, title = 'Confirm Delete', message, onCancel, onConfirm, loading = false, confirmText = 'Delete' }: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      footer={(
        <>
          <button type="button" className={btn.base} onClick={onCancel} disabled={loading}>Cancel</button>
          <button type="button" className={btn.danger} onClick={onConfirm} disabled={loading}>{loading ? 'Please wait...' : confirmText}</button>
        </>
      )}
    >
      <p>{message || 'Are you sure you want to delete this record? This action cannot be undone.'}</p>
    </Modal>
  );
}
