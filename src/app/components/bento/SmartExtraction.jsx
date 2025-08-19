// components/bento/SmartExtraction.jsx
export default function SmartExtraction() {
  return (
    <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
      <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <h3 className="mb-3 text-3xl font-bold leading-tight">Smart job details</h3>
      <p className="mb-6 text-base font-medium text-neutral-200">
        Our extractor reads the posting and standardizes key fields so your table stays clean and consistent.
      </p>

      <ul className="space-y-3 text-sm text-neutral-200">
        {[
          "Company and role",
          "Job location",
          "Salary range and currency",
          "Experience required",
          "Application deadline",
        ].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 ring-1 ring-emerald-400/20">
        Accurate parsing first; AI fallback only when details are missing.
      </div>
    </div>
  )
}
