// components/alerts-stack.js
'use client';
import { computeAlerts } from '@/app/lib/time';

export default function AlertsStack({ jobs }) {
  const alerts = computeAlerts(jobs||[]);
  if (!alerts.length) return null;
  return (
    <div className="space-y-2">
      {alerts.map((a,i)=>(
        <div key={i} className={`rounded-xl border px-3 py-2 text-sm ${a.type==='danger'?'bg-red-50 border-red-200 text-red-800':'bg-amber-50 border-amber-200 text-amber-900'}`}>
          <span className="font-medium">{a.title}</span>
          {' '}<button className="underline ml-1" onClick={()=>document.getElementById(a.anchorId)?.scrollIntoView({behavior:'smooth'})}>View</button>
        </div>
      ))}
    </div>
  );
}
