// components/notifications-banner.js
'use client';
import { useNotifications } from '@/app/hooks/use-notifications';

export default function NotificationsBanner({ jobs }) {
  const { permission, request } = useNotifications();
  if (permission === 'granted') return null;

  const anyDueTomorrow = (jobs||[]).some(j=>j.deadlineBadge==='due' && j.deadlineEtaDays===1);
  if (!anyDueTomorrow) return null;

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
      Notifications are off. Enable to get “1 day prior at 09:00 IST”.
      <button onClick={request} className="ml-2 underline">Enable</button>
    </div>
  );
}
