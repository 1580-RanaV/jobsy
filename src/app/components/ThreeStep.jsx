import React from 'react'

const ThreeStep = () => {
  return (
    <div>
        <section className="py-32">
          <div className="mx-auto max-w-8xl px-6 lg:px-8">
            <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
              {/* Header */}
              <div className="mb-14 text-center">
                <h2 className="mb-4 text-4xl font-bold md:text-8xl">Three Steps to Success</h2>
                <p className="mx-auto max-w-3xl text-base font-medium text-neutral-300">
                  From job link to job offer in the simplest way possible.
                </p>
              </div>

              {/* Steps grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Step 1 */}
                <div className="group rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold ring-1 ring-white/15">
                      1
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Start here</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight">Paste job link</h3>
                  <p className="mb-5 text-sm font-medium text-neutral-200">
                    Copy any job posting URL from LinkedIn, Indeed, or a company career page and paste it into Jobsy.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-200">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Works with major job boards and ATS pages.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Auto-detects company and role from the link.
                    </li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="group rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold ring-1 ring-white/15">
                      2
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Organize</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight">Get organized</h3>
                  <p className="mb-5 text-sm font-medium text-neutral-200">
                    We extract the details automatically and place them into neat, editable rows in your tracker.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-200">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Salary, experience, and deadline parsed cleanly.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Mark status with simple green/red chips.
                    </li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="group rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold ring-1 ring-white/15">
                      3
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Stay on time</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight">Never miss deadlines</h3>
                  <p className="mb-5 text-sm font-medium text-neutral-200">
                    Enable alerts to get notified a day before deadlines. Mark as applied when you’re done.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-200">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Due-soon and overdue banners on visit.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Optional browser notifications.
                    </li>
                  </ul>
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

export default ThreeStep