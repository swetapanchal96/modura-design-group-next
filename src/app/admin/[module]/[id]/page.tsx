'use client';

import { notFound, useParams } from 'next/navigation';
import ResourceForm from '@/components/admin/ResourceForm';
import { MODULES } from '@/lib/admin/modules';

export default function ModuleEditPage() {
  const { module, id } = useParams<{ module: string; id: string }>();
  const config = MODULES[module];
  if (!config || !/^\d+$/.test(id)) notFound();
  return <ResourceForm key={`${module}-${id}`} moduleKey={module} config={config} id={id} />;
}
