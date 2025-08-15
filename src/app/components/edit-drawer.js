// components/edit-drawer.js
'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function EditDrawer({ job, onClose }) {
  const [form, setForm] = useState(null);

  useEffect(() => { setForm(job); }, [job]);
  if (!job) return null;

  function update(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  function save() {
    window.dispatchEvent(new CustomEvent('jobs:update', { detail: form }));
    toast.success('Updated.');
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Panel */}
      <div className="ml-auto h-full w-full max-w-md bg-white border-l border-neutral-200 shadow-xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-neutral-200 h-14 px-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Edit job</h3>
          <button
            onClick={onClose}
            className="h-9 px-3 rounded-lg bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 space-y-4 overflow-auto">
          {['company','role','location','salaryText','experienceText','deadlineText','url'].map((k) => (
            <div key={k} className="space-y-1.5">
              <label className="block text-sm text-neutral-600 capitalize">
                {k.replace('Text','')}
              </label>
              <input
                value={form?.[k] || ''}
                onChange={(e) => update(k, e.target.value)}
                className="w-full h-12 rounded-xl border border-neutral-200 px-4 bg-white outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
          ))}

          <div className="flex items-center gap-2 pt-1">
            <input
              id="applied"
              type="checkbox"
              checked={!!form?.applied}
              onChange={(e) => update('applied', e.target.checked)}
              className="h-4 w-4 accent-neutral-900"
            />
            <label htmlFor="applied" className="text-sm text-neutral-800">
              Applied
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-neutral-200 px-4 py-3 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="h-11 px-4 rounded-xl bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="h-11 px-4 rounded-xl bg-neutral-900 text-white border border-neutral-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            Save
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div className="flex-1 bg-black/20" onClick={onClose} />
    </div>
  );
}
