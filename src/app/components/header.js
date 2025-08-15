// components/header.js
import ExportButton from './export-button';
import ImportDialog from './import-dialog';
import ClipboardSwitch from './clipboard-switch';
import Link from 'next/link';

export default function Header({ compact }) {
  return (
    <header className="sticky top-4 z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mx-auto w-full md:w-[min(100%,62rem)]">
          <div className="bg-white/90 backdrop-blur border-2 border-neutral-200 shadow-xl rounded-2xl h-18 flex items-center justify-between px-5 md:px-8">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-black/20 rounded-xl"
              aria-label="Jobsy Home"
            >
              <div className="h-8 w-8 rounded-full bg-neutral-900" />
              <span className="font-semibold tracking-tight text-lg text-neutral-900">
                Jobsy
              </span>
            </Link>

            {/* Actions */}
            {!compact && (
              <div className="flex items-center gap-3 bg-white py-1.5 px-2 rounded-xl">
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
