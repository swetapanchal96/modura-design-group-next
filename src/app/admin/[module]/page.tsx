'use client';

import { notFound, useParams } from 'next/navigation';
import ResourceList from '@/components/admin/ResourceList';
import { MODULES } from '@/lib/admin/modules';

export default function ModuleListPage() {
  const { module } = useParams<{ module: string }>();
  const config = MODULES[module];
  if (!config) notFound();
  return <ResourceList key={module} moduleKey={module} config={config} />;
}
