// components/bento/SmartAlerts.jsx
export default function SmartAlerts() {
  const rows = [
    { tone: "amber", text: "Due in 2 days: Software Engineer @ Mindtree." },
    { tone: "red", text: "Overdue: Product Designer @ Persistent Systems closed yesterday." },
    { tone: "red", text: "Overdue: Backend Developer @ Hexaware closed yesterday." },
    { tone: "red", text: "Overdue: QA Engineer @ Birlasoft closed yesterday." },
    { tone: "amber", text: "Due in 2 days: Software Engineer @ Zensar Technologies." },
    { tone: "red", text: "Overdue: UI Developer @ Sonata Software closed yesterday." },
    { tone: "red", text: "Overdue: Support Engineer @ Mphasis closed yesterday." },
    { tone: "amber", text: "Due in 2 days: Associate Developer @ L&T Infotech." },
    { tone: "amber", text: "Due in 2 days: Software Engineer @ Happiest Minds." },
  ]
  return (
    <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
      <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h3 className="mb-3 text-3xl font-bold leading-tight">Smart alerts</h3>
      <p className="mb-6 text-base font-medium text-neutral-200">
        See due-soon and overdue banners whenever you visit. Enable browser notifications to get reminded one day
        before deadlines.
      </p>

      <div className="space-y-3">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`rounded-xl px-4 py-3 text-sm ring-1 ${
              r.tone === "amber"
                ? "bg-amber-500/15 text-amber-200 ring-amber-400/20"
                : "bg-red-500/15 text-red-200 ring-red-400/20"
            }`}
          >
            {r.text}
          </div>
        ))}
      </div>
    </div>
  )
}
