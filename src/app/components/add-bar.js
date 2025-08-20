// components/add-bar.js
'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, X, ChevronDown, ChevronUp, Code, Loader2, ExternalLink } from 'lucide-react';

/* -----------------------------
   Job Filled Alert (Dark Bento)
------------------------------*/
function JobFilledAlert({ isVisible, onClose, jobUrl, detectedPattern }) {
  const [showDetails, setShowDetails] = useState(false);
  if (!isVisible) return null;

  const patterns = [
    { pattern: '/job.*has been filled/i', description: 'Detects &quot;job has been filled&quot; variations' },
    { pattern: '/position.*no longer available/i', description: 'Catches &quot;position no longer available&quot;' },
    { pattern: '/posting.*expired/i', description: 'Identifies expired job postings' },
    { pattern: '/application.*closed/i', description: 'Finds closed application notices' },
    { pattern: '/sorry.*job.*filled/i', description: 'Matches apologetic filled job messages' },
    { pattern: '/this position is no longer accepting applications/i', description: 'Direct &quot;no longer accepting&quot; statements' },
    { pattern: "/we\\'re sorry.*this specific position is no longer available/i", description: 'Mastercard-style unavailable messages' },
    { pattern: '/this job is no longer active/i', description: 'Job no longer active notices' },
    { pattern: '/position has been closed/i', description: 'Position closed announcements' },
    { pattern: '/applications are no longer being accepted/i', description: 'Applications no longer accepted' },
    { pattern: '/this opportunity has expired/i', description: 'Expired opportunity messages' },
    { pattern: '/job opening is closed/i', description: 'Job opening closed notices' },
    { pattern: '/recruitment for this position has ended/i', description: 'Recruitment ended statements' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div
        className={[
          'max-w-lg w-full mx-4 rounded-3xl',
          'bg-black text-white',
          // subtle dark edge, no white glow
          'border border-neutral-900/60 ring-1 ring-black/20',
          'shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)]',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-black">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold tracking-tight">Job Position Filled</h3>
              <p className="text-xs sm:text-sm text-white/60 tracking-tight">This position is no longer available</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="rounded-2xl border border-neutral-800 p-4 bg-black">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-white mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-white mb-1">Position No Longer Available</p>
                <p className="text-white/80">
                  Our system detected that this job posting has been filled or is no longer accepting applications.
                </p>
              </div>
            </div>
          </div>

          {/* Why do I see this */}
          <div className="border border-neutral-900/60 rounded-2xl overflow-hidden bg-black">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.06] transition"
            >
              <span className="text-sm font-medium text-white">Why do I see this?</span>
              {showDetails ? (
                <ChevronUp className="h-4 w-4 text-white/60" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/60" />
              )}
            </button>

            {showDetails && (
              <div className="px-4 pb-4 border-t border-neutral-900/60 pt-4 space-y-4">
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    <strong className="text-white">How Detection Works:</strong> We parse the page content and scan for
                    common &quot;position closed&quot; patterns.
                  </p>

                  <div className="bg-black rounded-2xl p-3 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-white/80" />
                      <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider">
                        Detection Patterns
                      </span>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {patterns.map((item, i) => (
                        <div key={i} className="text-xs">
                          <code className="px-2 py-1 rounded text-white font-mono text-[10px] leading-tight break-all bg-black border border-neutral-800">
                            {item.pattern}
                          </code>
                          <p className="text-white/60 mt-1 ml-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {detectedPattern && (
                    <div className="bg-black border border-neutral-800 rounded-2xl p-3">
                      <p className="text-xs font-medium text-white mb-1">Detected Pattern:</p>
                      <code className="text-xs px-2 py-1 rounded text-white font-mono break-all bg-black border border-neutral-800">
                        {detectedPattern}
                      </code>
                    </div>
                  )}

                  <p className="text-[11px] text-white/60 italic">
                    This helps you avoid applying to roles that are already closed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions (dark pills) */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-neutral-900/60 bg-black rounded-b-3xl">
          <button
            onClick={() => window.open(jobUrl, '_blank')}
            className={[
              'flex-1 inline-flex justify-center items-center',
              'h-10 sm:h-11 px-4 rounded-full',
              'text-sm font-medium tracking-tight',
              'bg-black text-white border border-neutral-800',
              'hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10',
              'shadow-[0_6px_20px_-10px_rgba(0,0,0,0.6)]',
            ].join(' ')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Original Page
          </button>

          <button
            onClick={onClose}
            className={[
              'flex-1 inline-flex justify-center items-center',
              'h-10 sm:h-11 px-4 rounded-full',
              'text-sm font-medium tracking-tight',
              'bg-black text-white border border-neutral-800',
              'hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10',
              'shadow-[0_6px_20px_-10px_rgba(0,0,0,0.6)]',
            ].join(' ')}
          >
            Find Similar Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   Add Bar (Dark Bento)
------------------------------*/
export default function AddBar() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jobFilledAlert, setJobFilledAlert] = useState({
    isVisible: false,
    jobUrl: '',
    detectedPattern: ''
  });

  // 1) Replace your addFromUrl with this
async function addFromUrl(u) {
  setIsLoading(true);
  try {
    const r = await fetch('/api/extract?url=' + encodeURIComponent(u));
    let data = null;
    try { data = await r.json(); } catch { /* no body or not JSON */ }

    // Special-case: job filled (your existing flow)
    if (r.status === 422 && data?.type === 'job_filled') {
      setJobFilledAlert({
        isVisible: true,
        jobUrl: data.url || u,
        detectedPattern: data.detectedPattern || ''
      });
      // ✅ Clear input after job filled alert
      setUrl('');
      return; // handled; don't throw
    }

    // Graceful user-facing handling for other non-OK responses
    if (!r.ok) {
      // Map a few common cases to better messages
      const msg =
        data?.error ||
        (r.status === 400 ? 'That doesnt look like a job posting link.' :
         r.status === 404 ? 'We couldnt load that page.' :
         r.status === 429 ? 'Youre going too fast. Try again in a moment.' :
         r.status >= 500 ? 'Server had a hiccup. Try again.' :
         'Could not add this URL');

      toast.error(msg);
      // ✅ Clear input after error
      setUrl('');
      return; // important: don't throw -> no scary console error
    }

    // Success
    window.dispatchEvent(new CustomEvent('jobs:add', { detail: data }));
    toast.success('Job added.');
    setUrl('');
  } catch (e) {
    // Network/unknown failures
    console.error('Error adding job:', e);
    toast.error('Network error while adding this URL');
    // ✅ Clear input after network error
    setUrl('');
  } finally {
    setIsLoading(false);
  }
}

  // 2) Replace looksJobLike with this (still lightweight, but smarter)
function looksJobLike(urlStr) {
  try {
    const u = new URL(urlStr);
    const host = u.hostname.replace(/^www\./, '');

    // obvious non-job sites
    if (/(^|\.)youtube\.|(^|\.)google\./i.test(host)) return false;

    // common applicant tracking + career hosts
    const jobHosts = [
      'lever.co', 'greenhouse.io', 'workday.com', 'ashbyhq.com',
      'smartrecruiters.com', 'icims.com', 'jobvite.com', 'bamboohr.com',
      'myworkdayjobs.com', 'eightfold.ai', 'freshteam.com', 'recruitee.com',
      'applytojob.com', 'successfactors.com', 'oraclecloud.com'
    ];
    if (jobHosts.some(h => host.endsWith(h))) return true;

    // typical job path hints for company domains
    const p = (u.pathname + u.search).toLowerCase();
    const joby = /(job|jobs|careers|career|opening|positions|vacancy|apply)/i.test(p);
    return joby;
  } catch {
    return false;
  }
}


  async function handleAdd() {
    if (!url || isLoading) return;
    if (!looksJobLike(url)) {
      toast.error("That doesn't look like a job posting URL");
      // ✅ Clear input after validation error
      setUrl('');
      return;
    }
    await addFromUrl(url);
  }

  async function handleFromClipboard() {
    if (isLoading) return;
    try {
      const t = await navigator.clipboard.readText();
      if (t) setUrl(t);
    } catch {
      toast.error('Clipboard blocked — click Enable Clipboard Watch again');
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <>
      <div className="px-1 sm:px-2 md:px-0">
        {/* Dark bento bar (no white halo) */}
        <div
          className={[
            'rounded-3xl bg-black text-white',
            'border border-neutral-900/60 ring-1 ring-black/20', // dark edge
            'shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)]',
            'p-2.5 sm:p-3',
          ].join(' ')}
        >
          {/* Mobile: stacked with better sizing */}
          <div className="flex flex-col sm:hidden gap-3">
            <input
              className={[
                'w-full h-12 px-4 rounded-full',
                'bg-black text-white placeholder:text-white/50',
                'border border-neutral-800', // ✅ removed thick white border for mobile
                'outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-0',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'text-sm',
              ].join(' ')}
              placeholder="Paste job URL…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Job URL"
              inputMode="url"
              disabled={isLoading}
            />

            <div className="flex gap-3">
              <button 
                onClick={handleFromClipboard} 
                className={[
                  'flex-1 inline-flex items-center justify-center',
                  'h-11 px-4 rounded-full',
                  'text-sm font-medium tracking-tight',
                  'bg-white text-black border border-white',
                  'hover:bg-neutral-100 hover:text-black transition',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                ].join(' ')}
                disabled={isLoading}
              >
                Clipboard
              </button>
              <button
                onClick={handleAdd}
                className={[
                  'flex-1 inline-flex items-center justify-center',
                  'h-11 px-4 rounded-full',
                  'text-sm font-medium tracking-tight',
                  'bg-gray-700 text-white border border-gray-700', // ✅ bg-gray-700 as requested
                  'hover:bg-gray-600 transition',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                ].join(' ')}
                disabled={!url || isLoading}
                aria-disabled={!url || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Adding…</span>
                  </div>
                ) : (
                  'Add'
                )}
              </button>
            </div>
          </div>

          {/* Desktop: single row */}
          <div className="hidden sm:flex gap-2 md:gap-3 items-center">
            <input
              className={[
                'flex-1 h-10 sm:h-11 md:h-12 px-4 sm:px-5 rounded-full',
                'bg-black text-white placeholder:text-white/50',
                'border border-neutral-800',
                'outline-none focus-visible:ring-2 focus-visible:ring-white/10 focus-visible:ring-offset-0',
                'disabled:opacity-50 disabled:cursor-not-allowed',
              ].join(' ')}
              placeholder="Paste job URL…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Job URL"
              inputMode="url"
              disabled={isLoading}
            />

            <button
              onClick={handleFromClipboard}
              disabled={isLoading}
              className={[
                'inline-flex items-center justify-center',
                'h-10 sm:h-11 md:h-12 px-4 rounded-full',
                'text-xs sm:text-sm font-medium tracking-tight',
                'bg-white text-black border border-white',
                'hover:bg-neutral-100 hover:text-black transition', // ✅ fixed hover colors
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
              ].join(' ')}
            >
              <span className="hidden md:block">From Clipboard</span>
              <span className="block md:hidden">Clipboard</span>
            </button>

            <button
              onClick={handleAdd}
              className={[
                'inline-flex items-center justify-center',
                'h-10 sm:h-11 md:h-12 px-4 rounded-full',
                'text-xs sm:text-sm font-medium tracking-tight',
                'bg-neutral-800 text-white border border-neutral-800',
                'hover:bg-gray-600 transition',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800',
                'disabled:opacity-50 disabled:cursor-not-allowed',
              ].join(' ')}
              disabled={!url || isLoading}
              aria-disabled={!url || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:block">Adding…</span>
                  <span className="block sm:hidden">…</span>
                </div>
              ) : (
                'Add'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Job Filled Alert */}
      <JobFilledAlert
        isVisible={jobFilledAlert.isVisible}
        onClose={() => setJobFilledAlert({ isVisible: false, jobUrl: '', detectedPattern: '' })}
        jobUrl={jobFilledAlert.jobUrl}
        detectedPattern={jobFilledAlert.detectedPattern}
      />
    </>
  );
}