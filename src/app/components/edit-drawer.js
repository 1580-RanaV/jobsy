// components/edit-drawer.js
'use client';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EditDrawer({ job, onClose }) {
  const [form, setForm] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const popoverRef = useRef(null);

  // ---------- Helpers (stable, TZ-safe) ----------
  function formatDate(date) {
    if (!date) return '';
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // clamp to local midnight
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // parse dd/mm/yyyy to a real Date (set 12:00 to avoid DST edge-cases → ISO keeps same day)
  function parseDate(dateString) {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) return null;
    const d = new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0, 0);
    return isNaN(d.getTime()) ? null : d;
  }

  // normalize ISO date string (strip time to noon local then ISO → avoids off-by-one)
  function toNormalizedISO(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
    return d.toISOString();
  }

  function daysUntil(date) {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
    return Math.floor((target - start) / (1000 * 60 * 60 * 24));
  }

  // Simple badge logic
  function getDeadlineBadge(date) {
    if (!date) return undefined;
    const d = daysUntil(date);
    if (d < 0) return 'overdue';
    if (d <= 7) return 'due';
    return 'ok';
  }

  // ---------- Effects ----------
  useEffect(() => {
    if (!job) return;

    // Seed form with job and ensure deadlineText is present when deadline exists
    const draft = { ...job };

    if (!draft.deadlineText && draft.deadline) {
      const iso = new Date(draft.deadline);
      if (!isNaN(iso.getTime())) {
        draft.deadlineText = formatDate(iso);
        setCurrentDate(iso);
      }
    } else if (draft.deadlineText) {
      const parsed = parseDate(draft.deadlineText);
      if (parsed) setCurrentDate(parsed);
    }

    setForm(draft);
  }, [job]);

  // Close calendar on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setShowCalendar(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!job) return null;

  function update(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  // ---------- Calendar handlers ----------
  function selectDate(date) {
    update('deadlineText', formatDate(date));
    update('deadline', toNormalizedISO(date));
    update('deadlineBadge', getDeadlineBadge(date)); // live badge
    setCurrentDate(date);
    setShowCalendar(false);
  }

  function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
  function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }
  function navigateMonth(direction) {
    setCurrentDate(prev => {
      const nd = new Date(prev);
      nd.setMonth(prev.getMonth() + direction);
      return nd;
    });
  }
  function isToday(date) {
    const t = new Date();
    return date.getFullYear() === t.getFullYear() &&
           date.getMonth() === t.getMonth() &&
           date.getDate() === t.getDate();
  }
  function isSelected(date) {
    const selected = parseDate(form?.deadlineText);
    if (!selected) return false;
    return date.toDateString() === selected.toDateString();
  }

  // ---------- Save ----------
  function save() {
    let deadlineDate = null;

    if (form?.deadlineText) {
      deadlineDate = parseDate(form.deadlineText);
    } else if (form?.deadline) {
      const d = new Date(form.deadline);
      if (!isNaN(d.getTime())) deadlineDate = d;
    }

    const payload = { ...form };

    if (deadlineDate) {
      payload.deadlineText = formatDate(deadlineDate);
      payload.deadline = toNormalizedISO(deadlineDate);
      payload.deadlineBadge = getDeadlineBadge(deadlineDate);
    } else {
      payload.deadlineText = '';
      payload.deadline = null;
      payload.deadlineBadge = undefined;
    }

    // Push to store listeners (JobTable listens for this)
    window.dispatchEvent(new CustomEvent('jobs:update', { detail: payload }));
    toast.success('Job updated successfully!');
    onClose();
  }

  // ---------- Calendar data ----------
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col lg:flex-row">
      {/* Right Drawer */}
      <div
        className={[
          'w-full lg:max-w-md bg-black border-l border-neutral-800',
          'shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)] flex flex-col h-full',
          'ml-auto'
        ].join(' ')}
      >
        {/* Header */}
        <div className="bg-black border-b border-neutral-800 h-16 px-6 flex items-center justify-between flex-shrink-0">
          <h3 className="text-xl font-semibold tracking-tight text-white">Edit Job</h3>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between min-h-0">
          <div className="space-y-4">
            {[
              { key: 'company', label: 'Company' },
              { key: 'role', label: 'Role' },
              { key: 'location', label: 'Location' },
              { key: 'salaryText', label: 'Salary' },
              { key: 'experienceText', label: 'Experience' },
              { key: 'url', label: 'Job URL' }
            ].map(({ key, label }) => (
              <div key={key} className="space-y-1.5">
                <label className="block text-xs font-medium text-white/80 uppercase tracking-wider">
                  {label}
                </label>
                <input
                  value={form?.[key] || ''}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full h-10 rounded-xl px-4 bg-black text-white placeholder:text-white/50 border border-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-white/20 transition-all duration-200 text-sm"
                  placeholder={`Enter ${label.toLowerCase()}...`}
                />
              </div>
            ))}

            {/* Deadline with anchored calendar */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/80 uppercase tracking-wider">
                Deadline
              </label>

              <div className="relative" ref={popoverRef}>
                <input
                  value={form?.deadlineText || ''}
                  onChange={(e) => {
                    const txt = e.target.value;
                    update('deadlineText', txt);
                    const parsed = parseDate(txt);
                    if (parsed) {
                      update('deadline', toNormalizedISO(parsed));
                      update('deadlineBadge', getDeadlineBadge(parsed));
                      setCurrentDate(parsed);
                    }
                  }}
                  placeholder="dd/mm/yyyy"
                  className="w-full h-10 rounded-xl pl-4 pr-12 bg-black text-white placeholder:text-white/50 border border-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-white/20 transition-all duration-200 text-sm"
                  onKeyDown={(e) => { if (e.key === 'Escape') setShowCalendar(false); }}
                  onFocus={() => setShowCalendar(false)} // keep closed on manual typing focus
                />

                <button
                  onClick={() => setShowCalendar((v) => !v)}
                  className={[
                    'absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg',
                    'text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                    showCalendar ? 'bg-white/10 text-white' : '',
                  ].join(' ')}
                  aria-label="Open calendar"
                >
                  <Calendar className="h-4 w-4" />
                </button>

                {/* Calendar Popover (anchored to Deadline input) */}
                {showCalendar && (
                  <div
                    className="absolute z-50 right-0 w-[20rem] bg-black border border-neutral-800 rounded-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)] p-6"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="w-10 h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h4 className="text-lg font-semibold text-white">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </h4>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="w-10 h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Days of week */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                        <div key={d} className="h-10 flex items-center justify-center text-sm text-white/60 font-medium">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1 mb-6">
                      {calendarDays.map((date, idx) => (
                        <div key={idx} className="h-10">
                          {date && (
                            <button
                              onClick={() => selectDate(date)}
                              className={[
                                'w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                                isSelected(date) ? 'bg-white text-black'
                                  : isToday(date) ? 'bg-white/20 text-white'
                                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                              ].join(' ')}
                            >
                              {date.getDate()}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Quick actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => selectDate(new Date())}
                        className="flex-1 h-11 rounded-full text-sm font-medium bg-black text-white border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                      >
                        Today
                      </button>
                      <button
                        onClick={() => {
                          update('deadlineText', '');
                          update('deadline', null);
                          update('deadlineBadge', undefined);
                          setShowCalendar(false);
                        }}
                        className="flex-1 h-11 rounded-full text-sm font-medium bg-black text-white border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Applied */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative">
                <input
                  id="applied"
                  type="checkbox"
                  checked={!!form?.applied}
                  onChange={(e) => update('applied', e.target.checked)}
                  className="sr-only"
                />
                <label
                  htmlFor="applied"
                  className={[
                    'flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200',
                    form?.applied ? 'bg-white border-white' : 'bg-black border-neutral-600 hover:border-neutral-500'
                  ].join(' ')}
                >
                  {form?.applied && (
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
              <label htmlFor="applied" className="text-sm text-white/90 cursor-pointer select-none">
                Mark as Applied
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-800 flex-shrink-0">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium tracking-tight bg-black text-white border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium tracking-tight bg-white text-black border border-white hover:bg-neutral-100 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Click-away JUST for the calendar popover (doesn't close the drawer) */}
      <div
        className="fixed inset-0"
        style={{ pointerEvents: showCalendar ? 'auto' : 'none' }}
        onMouseDown={(e) => {
          // If click happens outside the popover area, close it
          if (showCalendar && popoverRef.current && !popoverRef.current.contains(e.target)) {
            setShowCalendar(false);
          }
        }}
      />

      {/* Drawer Backdrop */}
      <div
        className={[
          'fixed inset-0 bg-black/60 backdrop-blur-sm',
          '-z-10'
        ].join(' ')}
        onClick={onClose}
      />
    </div>
  );
}
