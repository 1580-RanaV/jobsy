// components/import-dialog.js
'use client';
import { toast } from 'sonner';

export default function ImportDialog({ className = '' }) {
  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const txt = await f.text();
    try {
      const arr = JSON.parse(txt);
      for (const j of arr) {
        window.dispatchEvent(new CustomEvent('jobs:add', { detail: j }));
      }
      toast.success('Imported.');
    } catch {
      toast.error('Invalid JSON');
    }
  }

  const baseBtn =
    'inline-flex items-center justify-center ' +
    'h-7 sm:h-8 md:h-9 lg:h-10 px-1.5 sm:px-2 md:px-3 lg:px-4 ' +
    'rounded-md sm:rounded-lg md:rounded-xl ' +
    'text-2xs sm:text-xs md:text-sm lg:text-base ' +
    'bg-neutral-900 text-white border border-neutral-900 hover:bg-black transition ' +
    'cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 ' +
    'whitespace-nowrap';

  return (
    <label className={`${baseBtn} ${className}`}>
      <span className='text-xs'>Import</span>
      <input
        type="file"
        accept="application/json"
        hidden
        onChange={handleFile}
      />
    </label>
  );
}