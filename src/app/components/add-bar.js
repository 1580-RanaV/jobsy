// components/add-bar.js
'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddBar() {
  const [url, setUrl] = useState('');

  async function addFromUrl(u) {
    try {
      const r = await fetch('/api/extract?url=' + encodeURIComponent(u));
      if (!r.ok) throw new Error('Failed to fetch');
      const data = await r.json();
      window.dispatchEvent(new CustomEvent('jobs:add', { detail: data }));
      toast.success('Job added.');
      setUrl('');
    } catch {
      toast.error('Could not add this URL');
    }
  }

  async function handleAdd() {
    if (!url) return;
    await addFromUrl(url);
  }

  async function handleFromClipboard() {
    try {
      const t = await navigator.clipboard.readText();
      if (t) setUrl(t);
    } catch {
      toast.error('Clipboard blocked — click ‘Enable Clipboard Watch’ again.');
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }

  const btn =
    'inline-flex items-center justify-center h-12 px-4 rounded-xl ' +
    'bg-neutral-900 text-white border border-neutral-900 hover:bg-black transition ' +
    'focus:outline-none focus:ring-2 focus:ring-black/20 ' +
    'whitespace-nowrap leading-none font-medium';

  return (
    <div className="">
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-2">
        <div className="flex gap-2 md:gap-3">
          <input
            className="
              flex-1 h-12 px-4 rounded-xl bg-white
              outline-none focus:ring-2 focus:ring-black/20
              placeholder:text-neutral-500 text-[15px] leading-none
              border border-neutral-200
            "
            placeholder="Paste job URL…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Job URL"
            inputMode="url"
          />

          <button onClick={handleFromClipboard} className={btn}>
            From Clipboard
          </button>

          <button
            onClick={handleAdd}
            className={btn}
            disabled={!url}
            aria-disabled={!url}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
