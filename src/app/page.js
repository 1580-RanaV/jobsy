"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white font-inter">
      {/* Navigation */}
      <nav
        className={`bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b transition-all duration-300 ${
          isScrolled ? 'border-black shadow-lg' : 'border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-full"></div>
              <span className="text-2xl font-bold tracking-tighter text-black">Jobsy</span>
            </div>
            <div className="hidden md:flex items-center space-x-12">
              <button
                onClick={() => scrollToSection('features')}
                className="text-black hover:text-gray-500 font-medium tracking-tighter transition-colors text-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('privacy')}
                className="text-black hover:text-gray-500 font-medium tracking-tighter transition-colors text-lg"
              >
                Privacy
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-black hover:text-gray-500 font-medium tracking-tighter transition-colors text-lg"
              >
                How it works?
              </button>
              <Link href="/home">
                <button className="bg-black text-white px-8 py-3 rounded-full font-bold tracking-tighter hover:bg-gray-800 transition-all duration-200 border-2 border-black text-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-white rounded-t-3xl pt-16 pb-20 text-center max-w-6xl mx-auto px-4">
            {/* subtle glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(700px 350px at 50% 0%, rgba(0,0,0,0.05), transparent 60%)',
              }}
            />

            <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-[1.05] mb-6">
              Never Miss
              <br />
              <span className="block">A Job Deadline</span>
              Again.
            </h1>

            <p className="relative text-lg md:text-xl text-neutral-600 font-medium tracking-tight max-w-3xl mx-auto mb-10">
              Paste any job link — Get smart reminders — Land your dream job
            </p>

            {/* CTA row */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="/home"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-neutral-900 text-white border border-neutral-900 font-medium text-lg tracking-tight hover:bg-black transition-transform duration-200 hover:scale-105"
              >
                Start tracking jobs
              </a>
              <button className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-neutral-900 border border-neutral-200 font-medium text-lg tracking-tight hover:bg-neutral-50 transition-transform duration-200 hover:scale-105">
                See demo
              </button>
            </div>

            {/* reassurance line */}
            <div className="relative flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-600">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-neutral-900"></span>
                No login. Local-first.
              </span>
              <span className="h-2 w-2 rounded-full bg-neutral-900"></span>
              <span>Export / Import anytime</span>
              <span className="h-2 w-2 rounded-full bg-neutral-900"></span>
              <span>Clipboard Watch support</span>
            </div>
          </div>

          {/* Stats */}
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
      </section>

      {/* Spacing */}
      <div className="h-12"></div>

      {/* Features Bento Grid */}
      <section id="features" className="py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-24 text-center">
            <h2 className="mb-6 text-6xl font-bold text-neutral-900 md:text-8xl">How Jobsy Works</h2>
            <p className="mx-auto max-w-4xl text-xl font-medium text-neutral-600">
              Simple job tracking that keeps you organized and on time.
            </p>
          </div>

          {/* Bento grid (WRAPPER ADDED) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Auto-capture / Paste (filled version) */}
            <div className="lg:col-span-2 rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-8 flex items-start justify-between">
                <div className="rounded-2xl bg-white/10 p-4">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6M7 9h10M7 13h10M9 17h6" />
                  </svg>
                </div>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">Frictionless</span>
              </div>

              <h3 className="mb-3 text-3xl font-bold leading-tight">Paste the job link</h3>
              <p className="mb-8 max-w-3xl text-base font-medium text-neutral-200">
                Copy any job posting URL and add it to Jobsy. We extract company, role, salary, experience, and deadline
                from major job sites and company career pages.
              </p>

              {/* Filled bands */}
              <div className="space-y-5 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                {/* Band 1: Job boards */}
                <div>
                  <div className="mb-3 text-xs font-semibold text-neutral-300">Works with job boards</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'LinkedIn',
                      'Indeed',
                      'Naukri',
                      'Foundit',
                      'Glassdoor',
                      'ZipRecruiter',
                      'Monster',
                      'Wellfound (AngelList)',
                      'Hired',
                      'Dice',
                      'Instahyre',
                      'Freshersworld',
                    ].map((label) => (
                      <span key={label} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Band 2: ATS / career platforms */}
                <div className="border-t border-white/10 pt-4">
                  <div className="mb-3 text-xs font-semibold text-neutral-300">ATS and company career platforms</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Greenhouse',
                      'Lever',
                      'Ashby',
                      'Workable',
                      'SmartRecruiters',
                      'iCIMS',
                      'Taleo',
                      'Workday',
                      'JazzHR',
                      'BambooHR',
                      'Zoho Recruit',
                      'SAP SuccessFactors',
                    ].map((label) => (
                      <span key={label} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Band 3: Company pages */}
                <div className="border-t border-white/10 pt-4">
                  <div className="mb-3 text-xs font-semibold text-neutral-300">Company career pages</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Google',
                      'Microsoft',
                      'Amazon',
                      'Netflix',
                      'Stripe',
                      'Airbnb',
                      'Shopify',
                      'Adobe',
                      'Atlassian',
                      'Uber',
                      'Flipkart',
                      'Swiggy',
                      'Zomato',
                      'TCS',
                      'Infosys',
                    ].map((label) => (
                      <span key={label} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                        {label}
                      </span>
                    ))}
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">+ Many more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart extraction */}
            <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h3 className="mb-3 text-3xl font-bold leading-tight">Smart job details</h3>
              <p className="mb-6 text-base font-medium text-neutral-200">
                Our extractor reads the posting and standardizes key fields so your table stays clean and consistent.
              </p>

              <ul className="space-y-3 text-sm text-neutral-200">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Company and role
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Job location
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Salary range and currency
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Experience required
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Application deadline
                </li>
              </ul>

              <div className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 ring-1 ring-emerald-400/20">
                Accurate parsing first; AI fallback only when details are missing.
              </div>
            </div>

            {/* Reminders */}
            <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="mb-3 text-3xl font-bold leading-tight">Smart alerts</h3>
              <p className="mb-6 text-base font-medium text-neutral-200">
                See due-soon and overdue banners whenever you visit. Enable browser notifications to get reminded one day
                before deadlines.
              </p>

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
                <div className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200 ring-1 ring-red-400/20">
                  Overdue: QA Engineer @ Birlasoft closed yesterday.
                </div>
                <div className="rounded-xl bg-amber-500/15 px-4 py-3 text-sm text-amber-200 ring-1 ring-amber-400/20">
                  Due in 2 days: Software Engineer @ Zensar Technologies.
                </div>
                <div className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200 ring-1 ring-red-400/20">
                  Overdue: UI Developer @ Sonata Software closed yesterday.
                </div>
                <div className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200 ring-1 ring-red-400/20">
                  Overdue: Support Engineer @ Mphasis closed yesterday.
                </div>
                <div className="rounded-xl bg-amber-500/15 px-4 py-3 text-sm text-amber-200 ring-1 ring-amber-400/20">
                  Due in 2 days: Associate Developer @ L&T Infotech.
                </div>
                <div className="rounded-xl bg-amber-500/15 px-4 py-3 text-sm text-amber-200 ring-1 ring-amber-400/20">
                  Due in 2 days: Software Engineer @ Happiest Minds.
                </div>
              </div>
            </div>

            {/* Privacy / Local-only */}
            <div
              id="privacy"
              className="lg:col-span-2 rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10"
            >
              {/* Header */}
              <div className="mb-8 flex items-start justify-between">
                <div className="rounded-2xl bg-white/10 p-4">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M5 12a7 7 0 1014 0 7 7 0 00-14 0z"
                    />
                  </svg>
                </div>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">
                  100% Private • Local-only
                </span>
              </div>

              {/* Title + Copy */}
              <h3 className="mb-3 text-3xl font-bold leading-tight">Track everything locally</h3>
              <p className="mb-8 max-w-3xl text-base font-medium text-neutral-200">
                Your application data stays on your device. No accounts, no cloud sync, no data mining. Update status
                with one click and keep a clean audit trail.
              </p>

              {/* Stat strip */}
              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-white/10">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-neutral-300">Accounts</div>
                </div>
                <div className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-white/10">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-neutral-300">Servers</div>
                </div>
                <div className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-white/10">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-neutral-300">Yours</div>
                </div>
              </div>

              {/* Two-column content */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                {/* Left */}
                <div className="md:col-span-3 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                  <div className="mb-4 flex items-center gap-2">
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
                        d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <h4 className="text-lg font-bold">Privacy, by design</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-200">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                      Stored in IndexedDB on your browser — not uploaded anywhere.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                      Extraction runs on a server route and returns data only to you; nothing is persisted server-side.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                      Export or import your data as JSON/CSV at any time.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                      Clear history in one click — full local wipe.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                      No third-party analytics or tracking — your usage stays private.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                      All processing is encrypted in transit (HTTPS) to ensure secure data transfer.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                      No login or account required — full functionality without personal identification.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                      Open-source logic for full transparency on how your data is handled.
                    </li>
                  </ul>

                  <div className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 ring-1 ring-emerald-400/20">
                    Tip: On-visit alerts surface deadlines due tomorrow or within the next 48 hours.
                  </div>
                </div>

                {/* Right */}
                <div className="md:col-span-2 flex flex-col gap-4">
                  <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                    <div className="mb-3 inline-flex items-center gap-2">
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
                          d="M12 11V7a4 4 0 10-8 0v4m16 0V7a4 4 0 10-8 0v4"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 11h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"
                        />
                      </svg>
                      <h4 className="text-lg font-bold">Local-only pledge</h4>
                    </div>
                    <p className="mb-4 text-sm text-neutral-200">
                      We do not collect analytics or behavioral data from your dashboard. All insights and statuses render
                      locally.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg bg-white/10 px-3 py-2 text-center">No tracking</div>
                      <div className="rounded-lg bg-white/10 px-3 py-2 text-center">No sign-ups</div>
                      <div className="rounded-lg bg-white/10 px-3 py-2 text-center">No ads</div>
                      <div className="rounded-lg bg-white/10 px-3 py-2 text-center">No selling</div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                    <div className="mb-3 inline-flex items-center gap-2">
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
                          d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V9"
                        />
                      </svg>
                      <h4 className="text-lg font-bold">Control and portability</h4>
                    </div>
                    <p className="mb-4 text-sm text-neutral-200">
                      Keep everything portable with one-click export and import. Perfect for backups or switching devices.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-white/10 px-3 py-1">CSV</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">JSON</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">Local wipe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer note */}
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

            {/* Clipboard watch */}
            <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
                <svg
                  className="h-10 w-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                </svg>
              </div>

              <h3 className="mb-3 text-3xl font-bold leading-tight">Clipboard watch</h3>
              <p className="mb-6 text-base font-medium text-neutral-200">
                Keep the tab open and we auto-capture copied job links every few seconds. Zero extra steps.
              </p>

              <div className="rounded-xl bg-white/10 px-4 py-3 text-sm text-neutral-100">Works while this tab is visible.</div>
            </div>

            {/* Export & import */}
            <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
                <svg
                  className="h-10 w-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16M8 12h8M8 8h8M8 16h5" />
                </svg>
              </div>

              <h3 className="mb-3 text-3xl font-bold leading-tight">Export and import</h3>
              <p className="mb-6 text-base font-medium text-neutral-200">
                Download your data as CSV or JSON, and restore it in one click. Your applications stay portable.
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1">CSV</span>
                <span className="rounded-full bg-white/10 px-3 py-1">JSON</span>
                <span className="rounded-full bg-white/10 px-3 py-1">One-click restore</span>
              </div>
            </div>

            <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
                <svg
                  className="h-10 w-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="mb-3 text-3xl font-bold leading-tight">Smart Apply Reminders</h3>
              <p className="mb-6 text-base font-medium text-neutral-200">
                Never miss a deadline. Get alerts one day before an application closes, right in the tracker.
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-4 py-1">Deadline Alerts</span>
                <span className="rounded-full bg-white/10 px-4 py-1">Color-coded Warnings</span>
                <span className="rounded-full bg-white/10 px-4 py-1">Stay on Track</span>
                {/* <span className="rounded-full bg-white/10 px-4 py-1">Never miss</span> */}
              </div>
            </div>
          </div>
          {/* end grid */}
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section id="how-it-works" className="py-32 bg-white">
        <section className="py-32">
          <div className="mx-auto max-w-8xl px-6 lg:px-8">
            <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
              {/* Header */}
              <div className="mb-14 text-center">
                <h2 className="mb-4 text-6xl font-bold md:text-8xl">Three Steps to Success</h2>
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
      </section>

      {/* Feature Spotlight Cards */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Shell */}
          <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
            {/* Header */}
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-6xl font-bold md:text-8xl">Why Jobsy Works</h2>
              <p className="mx-auto max-w-3xl text-base font-medium text-neutral-300">
                Built for job seekers who want clarity, speed, and real outcomes.
              </p>
            </div>

            <div className="space-y-12">
              {/* 1) Smart AI Features */}
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                {/* Left: Copy */}
                <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                  <div className="mb-4 inline-flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden
                      >
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

              {/* Divider */}
              <div className="h-px w-full bg-white/10" />

              {/* 2) Privacy Focus */}
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                {/* Left: Visual stats */}
                <div className="order-2 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 lg:order-1">
                  <div className="mb-6 text-center">
                    <div className="text-4xl">🔒</div>
                    <div className="mt-2 text-lg font-bold">Your data = Your control</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/[0.04] p-6 text-center ring-1 ring-white/10">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-xs text-neutral-300">Cloud uploads</div>
                    </div>
                    <div className="rounded-2xl bg-white/[0.04] p-6 text-center ring-1 ring-white/10">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-xs text-neutral-300">Data selling</div>
                    </div>
                    <div className="rounded-2xl bg-white/[0.04] p-6 text-center ring-1 ring-white/10">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-xs text-neutral-300">Sign-ups</div>
                    </div>
                    <div className="rounded-2xl bg-white/[0.04] p-6 text-center ring-1 ring-white/10">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-xs text-neutral-300">Local</div>
                    </div>
                  </div>
                  <div className="mt-6 rounded-xl bg-white/[0.04] p-4 text-xs text-neutral-200 ring-1 ring-white/10">
                    Export or import your data anytime (CSV/JSON). Clear history in one click — full local wipe.
                  </div>
                </div>

                {/* Right: Copy */}
                <div className="order-1 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 lg:order-2">
                  <div className="mb-4 inline-flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
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
                          d="M9 12l2 2 4-4M5 12a7 7 0 1014 0 7 7 0 00-14 0z"
                        />
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

              {/* Divider */}
              <div className="h-px w-full bg-white/10" />

              {/* 3) Smart Notifications */}
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                {/* Left: Copy */}
                <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                  <div className="mb-4 inline-flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
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
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
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
            </div>
          </div>
        </div>
      </section>

      {/* Simple Export Feature */}
      <section id="export" className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
            {/* Header */}
            <div className="mb-14 text-center">
              <h2 className="mb-4 text-6xl font-bold md:text-8xl">Your data, your way</h2>
              <p className="mx-auto max-w-3xl text-base font-medium text-neutral-300">
                Export all your applications in seconds and keep everything portable across devices and tools.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* CSV */}
              <div className="group rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                      <span className="text-lg">📊</span>
                    </span>
                    <h3 className="text-2xl font-bold leading-tight">Export as CSV</h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Spreadsheets</span>
                </div>

                <p className="mb-5 text-sm font-medium text-neutral-200">
                  Download a spreadsheet-ready file for Excel, Google Sheets, or any analytics tool.
                </p>

                {/* Mini preview */}
                <div className="overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-red-400/80" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-xs text-neutral-300">applications.csv</span>
                  </div>
                  <div className="overflow-x-auto p-4">
                    <table className="w-full text-left text-xs text-neutral-200">
                      <thead className="text-neutral-300">
                        <tr className="border-b border-white/10">
                          <th className="py-2 pr-6">Company</th>
                          <th className="py-2 pr-6">Role</th>
                          <th className="py-2 pr-6">Salary</th>
                          <th className="py-2 pr-6">Deadline</th>
                          <th className="py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-6">Google</td>
                          <td className="py-2 pr-6">Software Engineer</td>
                          <td className="py-2 pr-6">$140k–$180k</td>
                          <td className="py-2 pr-6">Dec 15</td>
                          <td className="py-2">
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">Applied</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-6">Stripe</td>
                          <td className="py-2 pr-6">Design Lead</td>
                          <td className="py-2 pr-6">$150k–$200k</td>
                          <td className="py-2 pr-6">Dec 18</td>
                          <td className="py-2">
                            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-red-200">Not applied</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">
                    Download CSV
                  </button>
                  <span className="rounded-full bg-white/10 px-3 py-1">Comma-separated</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">Sheet-friendly</span>
                </div>
              </div>

              {/* JSON */}
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

                {/* Mini preview */}
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

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">
                    Download JSON
                  </button>
                  <span className="rounded-full bg-white/10 px-3 py-1">Structured</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">Portable</span>
                </div>
              </div>

              {/* Import / Restore */}
              <div className="group rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16M8 12h8M8 8h8M8 16h5" />
                      </svg>
                    </span>
                    <h3 className="text-2xl font-bold leading-tight">
                      Import & <br></br>restore
                    </h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">One click</span>
                </div>

                <p className="mb-5 text-sm font-medium text-neutral-200">
                  Move devices or recover history instantly. Import CSV or JSON and continue where you left off.
                </p>

                {/* Steps */}
                <ol className="space-y-3 text-sm text-neutral-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs ring-1 ring-white/15">
                      1
                    </span>
                    Choose CSV or JSON file.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs ring-1 ring-white/15">
                      2
                    </span>
                    Preview rows and confirm.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs ring-1 ring-white/15">
                      3
                    </span>
                    Done — your tracker updates locally.
                  </li>
                </ol>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">
                    Import CSV
                  </button>
                  <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">
                    Import JSON
                  </button>
                  <span className="rounded-full bg-white/10 px-3 py-1">Local-only</span>
                </div>
              </div>
            </div>

            {/* Footer hint */}
            <div className="mt-8 rounded-2xl bg-white/[0.03] px-5 py-4 text-sm text-neutral-200 ring-1 ring-white/10">
              Tip: Exports are generated in your browser — nothing is uploaded or stored on a server.
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 rounded-3xl">
          <div className="rounded-3xl ring-1 ring-white/10 shadow-2xl bg-black p-12 text-center">
            {/* Heading */}
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Ready to land <br className="hidden sm:block" /> your next job?
            </h2>
            <p className="text-xl md:text-xl text-neutral-300 font-medium tracking-tighter max-w-3xl mx-auto mb-12">
              Start tracking your job applications in just 10 seconds — no signup, no hassle.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/home">
                <button className="rounded-full bg-white text-black px-14 py-5 text-lg md:text-xl font-bold tracking-tighter hover:bg-neutral-100 transition-all duration-200 hover:scale-105">
                  Go to jobsy.com/home
                </button>
              </Link>
              <span className="text-sm md:text-base text-neutral-400 font-medium tracking-tighter">
                Takes 3 seconds to paste your first job
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-black rounded-full"></div>
                <span className="text-3xl font-bold tracking-tighter text-black">Jobsy</span>
              </div>
              <p className="text-black text-xl tracking-tighter font-medium max-w-md leading-relaxed">
                The simplest way to track job applications and never miss a deadline again.
              </p>
              <div className="mt-8">
                <Link href="/home">
                  <button className="bg-black text-white px-8 py-3 rounded-full font-bold tracking-tighter hover:bg-gray-800 transition-colors">
                    Get started free
                  </button>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold tracking-tighter mb-6 text-black">Product</h4>
              <div className="space-y-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('privacy')}
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Privacy
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  How it works
                </button>
                <button
                  onClick={() => scrollToSection('export')}
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Export data
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold tracking-tighter mb-6 text-black">Support</h4>
              <div className="space-y-4">
                <a
                  href="mailto:help@jobsy.com"
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  help@jobsy.com
                </a>
                <a
                  href="/privacy"
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/status"
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  System Status
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-black text-lg tracking-tighter font-medium mb-4 md:mb-0">
                © 2025 Jobsy. Built with privacy in mind.
              </div>
              <div className="text-black text-lg tracking-tighter font-medium">
                Your data never leaves your browser.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
