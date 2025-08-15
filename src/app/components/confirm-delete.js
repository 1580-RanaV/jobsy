// components/confirm-delete.js
'use client';
import { toast } from 'sonner';

export default function ConfirmDelete({ job, onClose }) {
  if (!job) return null;
  function del() {
    const detail = { id: job.id };
    window.dispatchEvent(new CustomEvent('jobs:delete', { detail }));
    const undo = () => window.dispatchEvent(new CustomEvent('jobs:undo-delete', { detail: job }));
    toast('Deleted. Undo?', { action: { label: 'Undo', onClick: undo } });
    onClose();
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="card p-5 max-w-sm w-full">
        <h3 className="font-semibold mb-2">Delete this job?</h3>
        <p className="text-sm text-neutral-600 mb-4">{job.role} @ {job.company}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="h-10 px-4 rounded-lg border border-neutral-200">Cancel</button>
          <button onClick={del} className="h-10 px-4 rounded-lg bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}
