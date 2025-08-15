// components/add-bar.js
'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, X, ChevronDown, ChevronUp, Code } from 'lucide-react';

// Job Filled Alert Component
function JobFilledAlert({ isVisible, onClose, jobUrl, detectedPattern }) {
  const [showDetails, setShowDetails] = useState(false);

  if (!isVisible) return null;

  const patterns = [
    { pattern: '/job.*has been filled/i', description: 'Detects "job has been filled" variations' },
    { pattern: '/position.*no longer available/i', description: 'Catches "position no longer available"' },
    { pattern: '/posting.*expired/i', description: 'Identifies expired job postings' },
    { pattern: '/application.*closed/i', description: 'Finds closed application notices' },
    { pattern: '/sorry.*job.*filled/i', description: 'Matches apologetic filled job messages' },
    { pattern: '/this position is no longer accepting applications/i', description: 'Direct "no longer accepting" statements' },
    { pattern: '/we\'re sorry.*this specific position is no longer available/i', description: 'Mastercard-style unavailable messages' },
    { pattern: '/this job is no longer active/i', description: 'Job no longer active notices' },
    { pattern: '/position has been closed/i', description: 'Position closed announcements' },
    { pattern: '/applications are no longer being accepted/i', description: 'Applications no longer accepted' },
    { pattern: '/this opportunity has expired/i', description: 'Expired opportunity messages' },
    { pattern: '/job opening is closed/i', description: 'Job opening closed notices' },
    { pattern: '/recruitment for this position has ended/i', description: 'Recruitment ended statements' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl max-w-lg w-full mx-4 transform transition-all animate-in fade-in-0 zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Job Position Filled</h3>
              <p className="text-sm text-gray-500">This position is no longer available</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Position No Longer Available</p>
                <p className="text-amber-700">
                  Our system detected that this job posting has been filled or is no longer accepting applications. 
                  The company has likely updated their careers page to reflect this status.
                </p>
              </div>
            </div>
          </div>

          {/* Why do I see this section */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
            >
              <span className="text-sm font-medium text-gray-700">Why do I see this?</span>
              {showDetails ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {showDetails && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-4">
                <div className="text-sm text-gray-600 space-y-3">
                  <p>
                    <strong>How Detection Works:</strong> Our system reads the actual webpage content and 
                    searches for specific text patterns that companies commonly use when positions are no longer available.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Detection Patterns</span>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {patterns.map((item, index) => (
                        <div key={index} className="text-xs">
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono text-[10px] leading-tight break-all">
                            {item.pattern}
                          </code>
                          <p className="text-gray-600 mt-1 ml-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {detectedPattern && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-800 mb-1">Detected Pattern:</p>
                      <code className="text-xs bg-red-100 px-2 py-1 rounded text-red-700 font-mono break-all">
                        {detectedPattern}
                      </code>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 italic">
                    This prevents you from wasting time applying to positions that are no longer open.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => window.open(jobUrl, '_blank')}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            View Original Page
          </button>
          <button
            onClick={onClose}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
          >
            Find Similar Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AddBar() {
  const [url, setUrl] = useState('');
  const [jobFilledAlert, setJobFilledAlert] = useState({
    isVisible: false,
    jobUrl: '',
    detectedPattern: ''
  });

  // Updated addFromUrl function with job filled detection
  async function addFromUrl(u) {
    try {
      const r = await fetch('/api/extract?url=' + encodeURIComponent(u));
      const data = await r.json();
      
      // Check for filled job
      if (r.status === 422 && data.type === 'job_filled') {
        setJobFilledAlert({
          isVisible: true,
          jobUrl: data.url || u,
          detectedPattern: data.detectedPattern || ''
        });
        return;
      }
      
      // Handle other errors
      if (!r.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }
      
      // Success
      window.dispatchEvent(new CustomEvent('jobs:add', { detail: data }));
      toast.success('Job added.');
      setUrl('');
      
    } catch (error) {
      console.error('Error adding job:', error);
      toast.error('Could not add this URL');
    }
  }

  // Before calling /api/extract
  function looksJobLike(urlStr) {
    try {
      const u = new URL(urlStr);
      const host = u.hostname.replace(/^www\./, '');
      if (host.includes('youtube.') || host.includes('google.')) return false;
      return true;
    } catch { 
      return false; 
    }
  }

  async function handleAdd() {
    if (!url) return;
    if (!looksJobLike(url)) {
      toast.error('That doesnt look like a job posting URL');
      return;
    }
    await addFromUrl(url);
  }

  async function handleFromClipboard() {
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

  const closeJobFilledAlert = () => {
    setJobFilledAlert({
      isVisible: false,
      jobUrl: '',
      detectedPattern: ''
    });
  };

  const btn =
    'inline-flex items-center justify-center ' +
    'h-8 sm:h-9 md:h-10 lg:h-12 ' +
    'px-2 sm:px-3 md:px-4 ' +
    'rounded-lg sm:rounded-xl ' +
    'text-2xs sm:text-xs md:text-sm lg:text-base ' +
    'bg-neutral-900 text-white border border-neutral-900 hover:bg-black transition ' +
    'focus:outline-none focus:ring-2 focus:ring-black/20 ' +
    'whitespace-nowrap leading-none font-medium';

  return (
    <>
      <div className="px-1 sm:px-2 md:px-0">
        <div className="bg-white border border-neutral-200 rounded-xl sm:rounded-2xl shadow-sm p-1.5 sm:p-2">
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col sm:hidden gap-2">
            <input
              className="
                flex-1 h-8 px-3 rounded-lg bg-white
                outline-none focus:ring-2 focus:ring-black/20
                placeholder:text-neutral-500 text-xs leading-none
                border border-neutral-200
              "
              placeholder="Paste job URL…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Job URL"
              inputMode="url"
            />
            <div className="flex gap-1">
              <button onClick={handleFromClipboard} className={`${btn} flex-1`}>
                <span className="block sm:hidden">Clipboard</span>
                <span className="hidden sm:block">From Clipboard</span>
              </button>
              <button
                onClick={handleAdd}
                className={`${btn} flex-1`}
                disabled={!url}
                aria-disabled={!url}
              >
                Add
              </button>
            </div>
          </div>

          {/* Desktop: Single row layout */}
          <div className="hidden sm:flex gap-2 md:gap-3">
            <input
              className="
                flex-1 h-9 sm:h-10 md:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-white
                outline-none focus:ring-2 focus:ring-black/20
                placeholder:text-neutral-500 text-sm sm:text-[15px] leading-none
                border border-neutral-200
              "
              placeholder="Paste job URL…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Job URL"
              inputMode="url"
            />

            <button onClick={handleFromClipboard} className={btn}>
              <span className="hidden md:block">From Clipboard</span>
              <span className="block md:hidden">Clipboard</span>
            </button>

            <button
              onClick={handleAdd}
              className={btn}
              disabled={!url}
              aria-disabled={!url}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Job Filled Alert */}
      <JobFilledAlert
        isVisible={jobFilledAlert.isVisible}
        onClose={closeJobFilledAlert}
        jobUrl={jobFilledAlert.jobUrl}
        detectedPattern={jobFilledAlert.detectedPattern}
      />
    </>
  );
}