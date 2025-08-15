// components/clipboard-switch.js
'use client';
import { useClipboardWatch } from '@/app/hooks/use-clipboard-watch';

export default function ClipboardSwitch({ className = '' }) {
  const { watching, toggle } = useClipboardWatch();

  return (
    <button
      onClick={toggle}
      aria-pressed={watching}
      className={[
        // simple black rounded button
        'inline-flex items-center justify-center',
        'h-10 px-4 rounded-xl',
        'bg-neutral-900 text-white border border-neutral-900',
        'hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-black/20',
        className,
      ].join(' ')}
    >
      {watching ? 'Stop Watch' : 'Enable Clipboard Watch'}
    </button>
  );
}
