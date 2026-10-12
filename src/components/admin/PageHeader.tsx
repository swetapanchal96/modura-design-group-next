import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  crumb?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, crumb, children }: PageHeaderProps) {
  return (
    <>
      <div className="mb-1 text-xs text-mute">Admin / {crumb || title}</div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <h2 className="text-[22px] font-semibold text-primary">{title}</h2>
        {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
      </div>
    </>
  );
}
