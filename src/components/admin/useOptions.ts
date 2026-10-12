'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/admin/api';
import type { ApiResponse, Option, OptionsSource, ResourceRecord } from '@/types/admin';

const cache = new Map<string, Option[]>();

/** Loads dropdown options from an admin endpoint (?all=1). */
export default function useOptions(source?: OptionsSource): Option[] {
  const key = source ? source.endpoint : null;
  const labelKey = source?.labelKey || 'name';
  const [options, setOptions] = useState<Option[]>(() => (key && cache.get(key)) || []);

  useEffect(() => {
    if (!key) return undefined;
    let alive = true;
    api.get<ApiResponse<ResourceRecord[]>>(key, { params: { all: 1 } })
      .then(({ data }) => {
        const opts: Option[] = (data.data || []).map((r) => ({
          value: String(r.id),
          label: String(r[labelKey] ?? '') + (r.status === false ? ' (inactive)' : ''),
        }));
        cache.set(key, opts);
        if (alive) setOptions(opts);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [key, labelKey]);

  return options;
}
