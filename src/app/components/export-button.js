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
    'inline-flex items-center justify-center ' +
    'h-7 sm:h-8 md:h-9 lg:h-10 px-1.5 sm:px-2 md:px-3 lg:px-4 ' +
    'rounded-md sm:rounded-lg md:rounded-xl ' +
    'text-2xs sm:text-xs md:text-sm lg:text-base ' +
    'bg-neutral-900 text-white border border-neutral-900 hover:bg-black transition ' +
    // the next two classes create a visible seam even on dark parent backgrounds
    'ring-1 ring-white/10 ring-offset-1 sm:ring-offset-2 ring-offset-white ' +
    'focus:outline-none focus:ring-2 focus:ring-black/20 ' +
    'whitespace-nowrap';

  return (
    <div className={`flex gap-1 sm:gap-1.5 md:gap-2 ${className}`}>
      <button onClick={dlJSON} className={baseBtn}>
        <span className="block sm:hidden">JSON</span>
        <span className="hidden sm:block text-xs">Export JSON</span>
      </button>
      <button onClick={dlCSV} className={baseBtn}>
        <span className="block sm:hidden">CSV</span>
        <span className="hidden sm:block text-xs">Export CSV</span>
      </button>
    </div>
  );
}