/** The admin panel lives under /admin – every admin link is built with this helper. */
export const ADMIN_BASE = '/admin';

export const adminPath = (path = ''): string => `${ADMIN_BASE}${path ? (path.startsWith('/') ? path : `/${path}`) : ''}`;
