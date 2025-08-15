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
      toast.error('Clipboard blocked — click Enable Clipboard Watch again');
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }

  const btn =
    'inline-flex items-center justify-center ' +
    'h-8 sm:h-9 md:h-10 lg:h-12 ' +
    'px-2 sm:px-3 md:px-4 ' +
    'rounded-lg sm:rounded-xl ' +
    'text-2xs sm:text-xs md:text-sm lg:text-base ' +
    'bg-neutral-900 text-white border border-neutral-900 hover:bg-black transition ' +
    'focus:outline-none focus:ring-2 focus:ring-black/20 ' +
    'whitespace-nowrap leading-none font-medium';

  return (
    <div className="px-1 sm:px-2 md:px-0">
      <div className="bg-white border border-neutral-200 rounded-xl sm:rounded-2xl shadow-sm p-1.5 sm:p-2">
        {/* Mobile: Stacked layout */}
        <div className="flex flex-col sm:hidden gap-2">
          <input
            className="
              flex-1 h-8 px-3 rounded-lg bg-white
              outline-none focus:ring-2 focus:ring-black/20
              placeholder:text-neutral-500 text-xs leading-none
              border border-neutral-200
            "
            placeholder="Paste job URL…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Job URL"
            inputMode="url"
          />
          <div className="flex gap-1">
            <button onClick={handleFromClipboard} className={`${btn} flex-1`}>
              <span className="block sm:hidden">Clipboard</span>
              <span className="hidden sm:block">From Clipboard</span>
            </button>
            <button
              onClick={handleAdd}
              className={`${btn} flex-1`}
              disabled={!url}
              aria-disabled={!url}
            >
              Add
            </button>
          </div>
        </div>

        {/* Desktop: Single row layout */}
        <div className="hidden sm:flex gap-2 md:gap-3">
          <input
            className="
              flex-1 h-9 sm:h-10 md:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-white
              outline-none focus:ring-2 focus:ring-black/20
              placeholder:text-neutral-500 text-sm sm:text-[15px] leading-none
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
            <span className="hidden md:block">From Clipboard</span>
            <span className="block md:hidden">Clipboard</span>
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