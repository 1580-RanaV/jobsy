import React from 'react'

const FirstCard = () => {
  return (
    <div>
        <section className="py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
                {/* Header strip */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="inline-flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h10M4 18h16"
                        />
                      </svg>
                    </span>
                    <h3 className="text-2xl font-bold leading-tight">Built for speed and privacy</h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">
                    No accounts • No servers
                  </span>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* Stat card 1 */}
                  <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                    <div className="mb-3 text-xs font-semibold text-neutral-300">Storage</div>
                    <div className="mb-1 text-5xl font-bold">100%</div>
                    <div className="text-sm text-neutral-300">Local storage only</div>

                    {/* Accent bar */}
                    <div className="mt-5 h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-full rounded-full bg-emerald-400/70" />
                    </div>

                    {/* Badges */}
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-white/10 px-3 py-1">IndexedDB</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">Private by default</span>
                    </div>
                  </div>

                  {/* Stat card 2 */}
                  <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                    <div className="mb-3 text-xs font-semibold text-neutral-300">Access</div>
                    <div className="mb-1 text-5xl font-bold">0</div>
                    <div className="text-sm text-neutral-300">Logins required</div>

                    {/* Accent bar */}
                    <div className="mt-5 h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-3/4 rounded-full bg-sky-400/70" />
                    </div>

                    {/* Badges */}
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-white/10 px-3 py-1">Instant start</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">No passwords</span>
                    </div>
                  </div>

                  {/* Stat card 3 */}
                  <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                    <div className="mb-3 text-xs font-semibold text-neutral-300">Speed</div>
                    <div className="mb-1 text-5xl font-bold">3s</div>
                    <div className="text-sm text-neutral-300">To save a job</div>

                    {/* Accent bar */}
                    <div className="mt-5 h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-2/3 rounded-full bg-amber-400/70" />
                    </div>

                    {/* Badges */}
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-white/10 px-3 py-1">Paste → Parse</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">One-click add</span>
                    </div>
                  </div>
                </div>

                {/* Footer hint */}
                <div className="mt-8 rounded-2xl bg-white/[0.03] px-5 py-4 text-sm text-neutral-200 ring-1 ring-white/10">
                  Tip: Keep this tab open to enable clipboard watch—newly copied job links are detected automatically.
                </div>
              </div>
            </div>
          </section>
    </div>
  )
}

export default FirstCard