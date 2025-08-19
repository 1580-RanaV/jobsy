// components/why/SmartReminders.jsx
export default function SmartReminders() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
      {/* Left: Copy */}
      <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
        <div className="mb-4 inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <h3 className="text-3xl font-bold leading-tight">Smart Reminders</h3>
        </div>

        <p className="mb-6 text-sm font-medium text-neutral-200">
          Deadlines sneak up fast. Enable alerts to get notified one day before each deadline. Visual banners on
          visit highlight what’s due soon or overdue.
        </p>

        <ul className="space-y-2 text-sm text-neutral-200">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            Due-soon (48 hrs) and overdue banners on the dashboard.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            Optional browser notifications for critical deadlines.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            Clear green/red status chips for instant progress tracking.
          </li>
        </ul>
      </div>

      {/* Right: Alert examples */}
      <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
        <div className="space-y-3">
          <div className="rounded-xl bg-amber-500/15 px-4 py-3 text-sm text-amber-200 ring-1 ring-amber-400/20">
            Due in 2 days: Software Engineer @ Mindtree.
          </div>
          <div className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200 ring-1 ring-red-400/20">
            Overdue: Product Designer @ Persistent Systems closed yesterday.
          </div>
          <div className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200 ring-1 ring-red-400/20">
            Overdue: Backend Developer @ Hexaware closed yesterday.
          </div>
          <div className="rounded-xl bg-amber-500/15 px-4 py-3 text-sm text-amber-200 ring-1 ring-amber-400/20">
            Due in 2 days: Associate Developer @ L&amp;T Infotech.
          </div>
          <div className="rounded-xl bg-amber-500/15 px-4 py-3 text-sm text-amber-200 ring-1 ring-amber-400/20">
            Due in 2 days: Software Engineer @ Happiest Minds.
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white/[0.04] px-4 py-3 text-xs text-neutral-200 ring-1 ring-white/10">
          Tip: Keep the tab open to enable clipboard watch — newly copied job links are detected automatically.
        </div>
      </div>
    </div>
  )
}
