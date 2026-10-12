export default function Loader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 p-6 text-mute">
      <span className="size-5 animate-spin rounded-full border-3 border-soft border-t-primary" />
      <span>{text}</span>
    </div>
  );
}
