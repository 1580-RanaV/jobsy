// components/export/ExportJSON.jsx
export default function ExportJSON() {
  return (
    <div className="group rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <span className="text-lg">⚡</span>
          </span>
          <h3 className="text-2xl font-bold leading-tight">Export as JSON</h3>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Developers</span>
      </div>

      <p className="mb-5 text-sm font-medium text-neutral-200">
        Keep a structured copy for backups, imports, and custom integrations.
      </p>

      <div className="overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-xs text-neutral-300">applications.json</span>
        </div>
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-neutral-200">
{`[
  {"company":"Netflix","role":"Product Manager","salary":"$160k–$220k","deadline":"Dec 20","status":"applied"},
  {"company":"Atlassian","role":"Frontend Engineer","salary":"₹25L–₹40L","deadline":"Jan 05","status":"not applied"}
]`}
        </pre>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs">
        <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">
          Download JSON
        </button>
        <span className="rounded-full bg-white/10 px-3 py-1">Structured</span>
        <span className="rounded-full bg-white/10 px-3 py-1">Portable</span>
      </div>
    </div>
  )
}
