// components/export-button.js
'use client';
import { toCSV } from '@/app/lib/csv';
import { useJobs } from '@/app/hooks/use-jobs';

export default function ExportButton({ className = '' }) {
  const { jobs } = useJobs();

  function dlJSON() {
    const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'applications.json';
    a.click();
  }

  function dlCSV() {
    const blob = new Blob([toCSV(jobs)], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'applications.csv';
    a.click();
  }

  const baseBtn =
    'inline-flex items-center justify-center h-10 px-4 rounded-xl ' +
    'bg-neutral-900 text-white border border-neutral-900 hover:bg-black transition ' +
    // the next two classes create a visible seam even on dark parent backgrounds
    'ring-1 ring-white/10 ring-offset-2 ring-offset-white ' +
    'focus:outline-none focus:ring-2 focus:ring-black/20';

  return (
    <div className={`flex ${className}`}>
      <button onClick={dlJSON} className={`${baseBtn} mr-2`}>
        Export JSON
      </button>
      <button onClick={dlCSV} className={baseBtn}>
        Export CSV
      </button>
    </div>
  );
}
