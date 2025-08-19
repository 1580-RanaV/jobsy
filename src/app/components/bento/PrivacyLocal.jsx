// components/bento/PrivacyLocal.jsx
export default function PrivacyLocal() {
  const pledge = [
    "Stored in IndexedDB on your browser — not uploaded anywhere.",
    "Extraction runs on a server route and returns data only to you; nothing is persisted server-side.",
    "Export or import your data as JSON/CSV at any time.",
    "Clear history in one click — full local wipe.",
    "No third-party analytics or tracking — your usage stays private.",
    "All processing is encrypted in transit (HTTPS) to ensure secure data transfer.",
    "No login or account required — full functionality without personal identification.",
    "Open-source logic for full transparency on how your data is handled.",
  ]
  return (
    <div id="privacy" className="lg:col-span-2 rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
      <div className="mb-8 flex items-start justify-between">
        <div className="rounded-2xl bg-white/10 p-4">
          <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M5 12a7 7 0 1014 0 7 7 0 00-14 0z" />
          </svg>
        </div>
        <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">100% Private • Local-only</span>
      </div>

      <h3 className="mb-3 text-3xl font-bold leading-tight">Track everything locally</h3>
      <p className="mb-8 max-w-3xl text-base font-medium text-neutral-200">
        Your application data stays on your device. No accounts, no cloud sync, no data mining. Update status
        with one click and keep a clean audit trail.
      </p>

      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { n: "0", label: "Accounts" },
          { n: "0", label: "Servers" },
          { n: "100%", label: "Yours" },
        ].map((x) => (
          <div key={x.label} className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-white/10">
            <div className="text-xl font-bold">{x.n}</div>
            <div className="text-xs text-neutral-300">{x.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="md:col-span-3 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
          <div className="mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h4 className="text-lg font-bold">Privacy, by design</h4>
          </div>

          <ul className="space-y-3 text-sm text-neutral-200">
            {pledge.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 ring-1 ring-emerald-400/20">
            Tip: On-visit alerts surface deadlines due tomorrow or within the next 48 hours.
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
            <div className="mb-3 inline-flex items-center gap-2">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V7a4 4 0 10-8 0v4m16 0V7a4 4 0 10-8 0v4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
              </svg>
              <h4 className="text-lg font-bold">Local-only pledge</h4>
            </div>
            <p className="mb-4 text-sm text-neutral-200">
              We do not collect analytics or behavioral data from your dashboard. All insights and statuses render locally.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["No tracking","No sign-ups","No ads","No selling"].map((t) => (
                <div key={t} className="rounded-lg bg-white/10 px-3 py-2 text-center">{t}</div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
            <div className="mb-3 inline-flex items-center gap-2">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V9" />
              </svg>
              <h4 className="text-lg font-bold">Control and portability</h4>
            </div>
            <p className="mb-4 text-sm text-neutral-200">
              Keep everything portable with one-click export and import. Perfect for backups or switching devices.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {["CSV","JSON","Local wipe"].map((p) => (
                <span key={p} className="rounded-full bg-white/10 px-3 py-1">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-white/[0.03] px-5 py-4 ring-1 ring-white/10">
        <div className="text-sm text-neutral-300">
          Your data never leaves your browser. Learn more in the Privacy Policy.
        </div>
        <a
          href="/privacy"
          className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
        >
          View policy
        </a>
      </div>
    </div>
  )
}

