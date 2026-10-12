import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-[420px] rounded-lg border border-line bg-white p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-primary">Page not found</h2>
        <p className="mb-5 text-mute">The page you are looking for does not exist.</p>
        <Link href="/" className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-600">Go to Home</Link>
      </div>
    </div>
  );
}
