// components/export/ImportRestore.jsx
export default function ImportRestore() {
  return (
    <div className="group rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16M8 12h8M8 8h8M8 16h5" />
            </svg>
          </span>
          <h3 className="text-2xl font-bold leading-tight">
            Import & <br /> restore
          </h3>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">One click</span>
      </div>

      <p className="mb-5 text-sm font-medium text-neutral-200">
        Move devices or recover history instantly. Import CSV or JSON and continue where you left off.
      </p>

      <ol className="space-y-3 text-sm text-neutral-200">
        <li className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs ring-1 ring-white/15">
            1
          </span>
          Choose CSV or JSON file.
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs ring-1 ring-white/15">
            2
          </span>
          Preview rows and confirm.
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs ring-1 ring-white/15">
            3
          </span>
          Done — your tracker updates locally.
        </li>
      </ol>

      <div className="mt-5 flex flex-wrap gap-2 text-xs">
        <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">
          Import CSV
        </button>
        <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">
          Import JSON
        </button>
        <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">Local-only</span>
      </div>
    </div>
  )
}
