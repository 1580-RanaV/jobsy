// components/bento/InactiveDetection.jsx
export default function InactiveDetection() {
  return (
    <div className="relative lg:col-span-3 rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-20 -top-20 h-56"
        style={{
          background:
            "radial-gradient(700px 160px at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-32 -bottom-24 h-56"
        style={{
          background:
            "radial-gradient(600px 140px at 50% 100%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      <div className="mb-8 flex items-start justify-between relative">
        <div className="rounded-2xl bg-white/10 p-4">
          <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">
            <span className="relative inline-flex">
              <span className="motion-safe:animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Time saver
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">New</span>
        </div>
      </div>

      <h3 className="mb-3 text-3xl md:text-4xl font-bold leading-tight relative">
        Instantly flags inactive or filled job links before they clutter your tracker
      </h3>
      <p className="mb-8 max-w-4xl text-base font-medium text-neutral-200 relative">
        Paste a link and we auto-detect phrases like <em>“no longer available”</em>, <em>“applications closed”</em>,
        or <em>“position filled”</em> — and stop it from being added. You save time and keep your table clean.
      </p>

      <div className="relative space-y-4 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
        <div className="rounded-xl bg-red-500/15 ring-1 ring-red-400/20 px-4 py-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-red-200">Detected: Inactive posting</div>
              <div className="text-sm text-red-200/90">
                “This specific position is <span className="font-semibold">no longer available</span>.”
              </div>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Blocked</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="rounded-lg bg-white/10 px-3 py-2 text-center">“applications closed”</div>
          <div className="rounded-lg bg-white/10 px-3 py-2 text-center">“no longer accepting applications”</div>
          <div className="rounded-lg bg-white/10 px-3 py-2 text-center">“position has been filled”</div>
        </div>

        <div className="text-xs text-neutral-300">
          Tip: You’ll see a friendly modal explaining why the link was blocked, with a quick way to open the original page.
        </div>
      </div>
    </div>
  )
}
