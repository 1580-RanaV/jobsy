// components/why/PrivacyFocus.jsx
export default function PrivacyFocus() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
      {/* Left: Visual stats */}
      <div className="order-2 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 lg:order-1">
        <div className="mb-6 text-center">
          <div className="text-4xl">🔒</div>
          <div className="mt-2 text-lg font-bold">Your data = Your control</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            ["0", "Cloud uploads"],
            ["0", "Data selling"],
            ["0", "Sign-ups"],
            ["100%", "Local"],
          ].map(([n, label]) => (
            <div key={label} className="rounded-2xl bg-white/[0.04] p-6 text-center ring-1 ring-white/10">
              <div className="text-2xl font-bold">{n}</div>
              <div className="text-xs text-neutral-300">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-white/[0.04] p-4 text-xs text-neutral-200 ring-1 ring-white/10">
          Export or import your data anytime (CSV/JSON). Clear history in one click — full local wipe.
        </div>
      </div>

      {/* Right: Copy */}
      <div className="order-1 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 lg:order-2">
        <div className="mb-4 inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M5 12a7 7 0 1014 0 7 7 0 00-14 0z" />
            </svg>
          </span>
          <h3 className="text-3xl font-bold leading-tight">Privacy by Design</h3>
        </div>

        <p className="mb-6 text-sm font-medium text-neutral-200">
          Other trackers mine your data. Jobsy stores everything locally in your browser — no servers, no
          accounts, no tracking. Your information stays on your device and is always portable.
        </p>

        <ul className="space-y-2 text-sm text-neutral-200">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            Stored in IndexedDB — not uploaded anywhere.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            No analytics or behavioral tracking from your dashboard.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
            One-click export/import to CSV/JSON.
          </li>
        </ul>
      </div>
    </div>
  )
}
