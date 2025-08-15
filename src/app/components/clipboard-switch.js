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
        // simple black rounded button with responsive sizing
        'inline-flex items-center justify-center',
        'h-7 sm:h-8 md:h-9 lg:h-10 px-1.5 sm:px-2 md:px-3 lg:px-4 rounded-md sm:rounded-lg md:rounded-xl',
        'text-2xs sm:text-xs md:text-sm lg:text-base',
        'bg-neutral-900 text-white border border-neutral-900',
        'hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-black/20',
        'whitespace-nowrap',
        className,
      ].join(' ')}
    >
      <span className="block sm:hidden text-lg">
        {watching ? 'Stop' : 'Clipboard'}
      </span>
      <span className="hidden sm:block text-lg">
        {watching ? 'Stop Watch' : 'Enable Clipboard Watch'}
      </span>
    </button>
  );
}