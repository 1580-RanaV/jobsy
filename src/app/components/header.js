// components/header.js
import ExportButton from './export-button';
import ImportDialog from './import-dialog';
import ClipboardSwitch from './clipboard-switch';
import Link from 'next/link';

export default function Header({ compact }) {
  return (
    <header className="sticky top-3 z-40">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto w-full lg:w-[min(100%,62rem)]">
          <div className="bg-white/90 backdrop-blur border border-neutral-200 shadow-xl rounded-2xl min-h-12 sm:min-h-14 md:h-16 lg:h-18 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 py-2 sm:py-2.5 md:py-0">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 md:gap-3 focus:outline-none focus:ring-2 focus:ring-black/20 rounded-lg md:rounded-xl shrink-0"
              aria-label="Jobsy Home"
            >
              <div className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 rounded-full bg-neutral-900" />
              <span className="font-semibold tracking-tight text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-neutral-900">
                Jobsy
              </span>
            </Link>

            {/* Actions on mobile - shown below brand on small screens */}
            {!compact && (
              <div className="flex md:hidden items-center gap-1.5 sm:gap-2 w-full">
                <ClipboardSwitch />
                <ExportButton />
                <ImportDialog />
              </div>
            )}

            {/* Desktop spacer */}
            <div className="hidden md:block flex-1" />

            {/* Desktop actions */}
            {!compact && (
              <div className="hidden md:flex items-center gap-2 lg:gap-3">
                <ClipboardSwitch />
                <ExportButton />
                <ImportDialog />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}