// components/bento/ExportImport.jsx
export default function ExportImport() {
  return (
    <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
      <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
        <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16M8 12h8M8 8h8M8 16h5" />
        </svg>
      </div>

      <h3 className="mb-3 text-3xl font-bold leading-tight">Export and import</h3>
      <p className="mb-6 text-base font-medium text-neutral-200">
        Download your data as CSV or JSON, and restore it in one click. Your applications stay portable.
      </p>

      <div className="flex flex-wrap gap-2 text-xs">
        {["CSV","JSON","One-click restore"].map((p) => (
          <span key={p} className="rounded-full bg-white/10 px-3 py-1">{p}</span>
        ))}
      </div>
    </div>
  )
}
