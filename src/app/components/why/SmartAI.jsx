// components/why/SmartAI.jsx
export default function SmartAI() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
      {/* Left: Copy */}
      <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
        <div className="mb-4 inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          <h3 className="text-3xl font-bold leading-tight">AI That Actually Helps</h3>
        </div>

        <p className="mb-6 text-sm font-medium text-neutral-200">
          Most job boards just show listings. Jobsy reads the posting and extracts the details you need —
          company, role, salary range, experience, and deadlines — so your table stays clean and consistent.
        </p>

        <ul className="space-y-2 text-sm text-neutral-200">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            Salary ranges parsed from descriptions and standardized with currency.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            Hidden deadlines surfaced from long-form text.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            Company and role names normalized for clean sorting and filtering.
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1">Reliable parsing</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Minimal edits</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Consistent rows</span>
        </div>
      </div>

      {/* Right: Demo cards */}
      <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
        <div className="space-y-4">
          <div className="rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10">
            <div className="mb-2 text-xs font-semibold text-neutral-300">Detected from job posting</div>
            <div className="text-sm font-bold">Google • Software Engineer • $140k–$180k • Due: Dec 15</div>
          </div>
          <div className="rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10">
            <div className="mb-2 text-xs font-semibold text-neutral-300">Detected from job posting</div>
            <div className="text-sm font-bold">Netflix • Product Manager • $160k–$220k • Due: Dec 20</div>
          </div>
          <div className="rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10">
            <div className="mb-2 text-xs font-semibold text-neutral-300">Detected from job posting</div>
            <div className="text-sm font-bold">Stripe • Design Lead • $150k–$200k • Due: Dec 18</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200 ring-1 ring-emerald-400/20">
          Accurate parsing first; AI fallback only when details are missing.
        </div>
      </div>
    </div>
  )
}
