/**
 * Re-usable Tailwind class strings for the admin (no custom CSS).
 * Colours come from the @theme block in app/globals.css.
 */
import { twMerge } from 'tailwind-merge';

/** Joins class names; when two classes clash (e.g. bg-white + bg-primary) the LAST one wins. */
export const cx = (...c: (string | false | null | undefined)[]): string => twMerge(c.filter(Boolean).join(' '));

const btnBase =
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md border font-medium transition disabled:cursor-not-allowed disabled:opacity-60';

export const btn = {
  base: cx(btnBase, 'border-secondary bg-white px-3.5 py-2 text-[13px] text-primary hover:bg-fill'),
  primary: cx(btnBase, 'border-primary bg-primary px-3.5 py-2 text-[13px] text-white hover:bg-primary-600'),
  danger: cx(btnBase, 'border-danger bg-danger px-3.5 py-2 text-[13px] text-white hover:opacity-90'),
  sm: cx(btnBase, 'border-secondary bg-white px-2.5 py-1 text-xs text-primary hover:bg-fill'),
  smPrimary: cx(btnBase, 'border-primary bg-primary px-2.5 py-1 text-xs text-white hover:bg-primary-600'),
  smDanger: cx(btnBase, 'border-danger bg-white px-2.5 py-1 text-xs text-danger hover:bg-red-50'),
  plus: cx(btnBase, 'border-success bg-success px-2.5 py-0.5 text-base font-bold leading-6 text-white hover:opacity-90'),
};

export const input = (invalid = false): string =>
  cx(
    'w-full rounded-md border bg-white px-3 py-2 text-[13px] text-ink placeholder:text-steel',
    'focus:border-secondary focus:outline-none focus:ring-3 focus:ring-secondary/20',
    invalid ? 'border-danger' : 'border-line'
  );

export const label = 'mb-1.5 block text-xs font-semibold text-primary';
export const hint = 'mt-1 text-[11px] text-mute';
export const err = 'mt-1 text-xs text-danger';
export const card = 'mb-5 rounded-lg border border-line bg-white p-5';
export const th = 'bg-primary px-3 py-2.5 text-left text-xs font-semibold text-white';
export const td = 'border-b border-soft px-3 py-2.5 align-middle text-[13px]';

export const badge = (tone: 'success' | 'off' | 'info' | 'warning' | 'danger' = 'success'): string =>
  cx(
    'inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white',
    { success: 'bg-success', off: 'bg-off', info: 'bg-info', warning: 'bg-warning', danger: 'bg-danger' }[tone]
  );

/** Search box / filter select in a list toolbar. */
export const toolField = cx(input(), 'w-auto min-w-[150px] flex-1');
export const toolbar = 'mb-3.5 flex flex-wrap gap-2.5';
export const table = 'w-full min-w-[680px] border-collapse';
export const rowHover = 'hover:bg-surface/50';
export const tdEmpty = 'p-7 text-center text-mute';
export const tabBtn = (on: boolean): string =>
  cx('rounded-t-md border border-b-0 px-4 py-2 text-[13px]', on ? 'border-primary bg-primary text-white' : 'border-line bg-white text-primary hover:bg-fill');

/** Label / value rows in "View details" popups. */
export const kvRow = 'grid grid-cols-1 gap-0.5 border-b border-soft py-1.5 text-[13px] md:grid-cols-[150px_1fr] md:gap-2.5';
export const kvKey = 'font-semibold text-mute';
export const kvVal = 'whitespace-pre-wrap break-words';
export const dateField = cx(input(), 'w-auto min-w-[130px] flex-none md:w-[150px]');
