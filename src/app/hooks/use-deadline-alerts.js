// src/app/hooks/use-deadline-alerts.js
'use client';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { computeAlerts } from '@/app/lib/time';

export function useDeadlineAlerts(jobs = []) {
  useEffect(() => {
    if (!jobs.length) return;

    const alerts = computeAlerts(jobs);
    alerts.forEach(a => {
      if (a.type === 'warn') {
        toast.warning(a.title, { duration: 5000 });
      } else if (a.type === 'danger') {
        toast.error(a.title, { duration: 5000 });
      }
    });
  }, [jobs]);
}
