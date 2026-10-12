import { redirect } from 'next/navigation';

/** /admin → /admin/dashboard (the panel sends you to /admin/login if you are not logged in). */
export default function AdminHome() {
  redirect('/admin/dashboard');
}
