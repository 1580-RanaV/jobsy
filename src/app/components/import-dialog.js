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
    'inline-flex items-center justify-center h-10 px-4 rounded-xl bg-neutral-900 text-white border border-neutral-900 hover:bg-black transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20';

  return (
    <label className={`${baseBtn} ${className}`}>
      Import
      <input
        type="file"
        accept="application/json"
        hidden
        onChange={handleFile}
      />
    </label>
  );
}
