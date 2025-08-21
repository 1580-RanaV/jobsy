
// components/job-table.js
'use client';

import { useJobs } from '@/app/hooks/use-jobs';
import EditDrawer from './edit-drawer';
import ConfirmDelete from './confirm-delete';
import Badges from './badges';
import { useState, useRef, useEffect } from 'react';
import { Search, Filter, ExternalLink, Trash2, Check, X, Plus, Calendar, MoreVertical } from 'lucide-react';

export default function JobTable({ search, setSearch, filters, setFilters }) {
  const { jobs, toggleApplied, updateJob } = useJobs();

  const [drawerJob, setDrawerJob] = useState(null);
  const [deleteJob, setDeleteJob] = useState(null);

  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const [showCalendar, setShowCalendar] = useState(null);
  const [showMobileActions, setShowMobileActions] = useState(null);

  // Optimistic overlay if updateJob is missing
  const [optimistic, setOptimistic] = useState({}); // { [jobId]: { field: value, ... } }

  // Refs for editing input
  const inputWrapRef = useRef(null);
  const inputElRef = useRef(null);
  const calendarRef = useRef(null);
  const mobileActionsRef = useRef(null);

  // ---- Helpers ------------------------------------------------------------
  const patchJob = (jobId, patch) => {
    // 1) If your hook provides updateJob, use it
    if (typeof updateJob === 'function') {
      updateJob(jobId, patch);
      return;
    }
    // 2) Fallback: optimistic overlay so UI updates immediately
    setOptimistic(prev => ({
      ...prev,
      [jobId]: { ...(prev[jobId] || {}), ...patch },
    }));
  };

  function withOptimistic(j) {
    return optimistic[j.id] ? { ...j, ...optimistic[j.id] } : j;
  }

  function computeDeadlineBadge(dateObj) {
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const tgt = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 12, 0, 0, 0);
    const days = Math.floor((tgt - today) / (1000 * 60 * 60 * 24));
    return days < 0 ? 'overdue' : days <= 7 ? 'due' : 'ok';
  }

  function normalizeDeadline(job) {
    if (!job) return job;
    const out = { ...job };

    if (!out.deadlineText && out.deadline) {
      const d = new Date(out.deadline);
      if (!isNaN(d)) {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yy = d.getFullYear();
        out.deadlineText = `${dd}/${mm}/${yy}`;
        out.deadlineBadge = computeDeadlineBadge(d);
      }
    }

    return out;
  }

  function filtered() {
    let list = (jobs || []).map(withOptimistic).map(normalizeDeadline);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        j =>
          (j.company || '').toLowerCase().includes(q) ||
          (j.role || '').toLowerCase().includes(q) ||
          (j.location || '').toLowerCase().includes(q)
      );
    }
    if (filters === 'applied') list = list.filter(j => j.applied);
    if (filters === 'pending') list = list.filter(j => !j.applied);
    if (filters === 'due') list = list.filter(j => j.deadlineBadge === 'due');
    return list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  const filteredJobs = filtered();

  // ---- Outside click close (editing + calendar + mobile actions) ---------
  useEffect(() => {
    function handleClickOutside(event) {
      // If editing and click outside the popover, save
      if (editingCell) {
        const wrap = inputWrapRef.current;
        if (wrap && !wrap.contains(event.target)) handleSaveEdit();
      }
      // If calendar open and click outside, close
      if (showCalendar) {
        const cal = calendarRef.current;
        if (cal && !cal.contains(event.target)) setShowCalendar(null);
      }
      // If mobile actions open and click outside, close
      if (showMobileActions) {
        const actions = mobileActionsRef.current;
        if (actions && !actions.contains(event.target)) setShowMobileActions(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editingCell, showCalendar, showMobileActions, editValue]);

  // Keep focus while typing
  useEffect(() => {
    if (editingCell && inputElRef.current) {
      const el = inputElRef.current;
      try {
        el.focus();
        const value = el.value || '';
        if (typeof el.setSelectionRange === 'function') {
          // Put caret at end without blurring
          const pos = Math.min(value.length, 25);
          el.setSelectionRange(pos, pos);
        }
      } catch {}
    }
  }, [editingCell, editValue]);

  // ---- Editing handlers ---------------------------------------------------
  const handleCellClick = (jobId, field, currentValue) => {
    if (field === 'deadline') {
      setEditingCell(null);
      setShowCalendar(jobId);
      return;
    }
    setShowCalendar(null);
    setEditingCell({ jobId, field });
    setEditValue((currentValue || '').slice(0, 25));
  };

  const handleSaveEdit = () => {
    if (!editingCell) return;
    const { jobId, field } = editingCell;
    const trimmedValue = editValue.trim().slice(0, 25);
    patchJob(jobId, { [field]: trimmedValue || '' });
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSaveEdit();
    else if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    }
  };

  // ---- Calendar -----------------------------------------------------------
  const handleDateSelect = (jobId, date) => {
    const iso = date.toISOString();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = date.getFullYear();
    const deadlineText = `${dd}/${mm}/${yy}`;
    const deadlineBadge = computeDeadlineBadge(date);

    patchJob(jobId, { deadline: iso, deadlineText, deadlineBadge });
    setShowCalendar(null);
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const firstDayWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < firstDayWeek; i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(currentYear, currentMonth, day));
    }
    return days;
  };

  // ---- Buttons ------------------------------------------------------------
  const darkButton = [
    'inline-flex items-center justify-center gap-2',
    'h-8 px-3 rounded-full',
    'text-xs font-medium tracking-tight',
    'bg-black text-white border border-neutral-800',
    'hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
  ].join(' ');

  const primaryButton = [
    'inline-flex items-center justify-center gap-2',
    'h-8 px-3 rounded-full',
    'text-xs font-medium tracking-tight',
    'bg-white text-black border border-white',
    'hover:bg-neutral-100 transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20',
  ].join(' ');

  const dangerButton = [
    'inline-flex items-center justify-center gap-2',
    'h-8 px-3 rounded-full',
    'text-xs font-medium tracking-tight',
    'bg-red-600 text-white border border-red-600',
    'hover:bg-red-700 hover:border-red-700 transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20',
  ].join(' ');

  const filterButton = (isActive) => [
    'inline-flex items-center justify-center whitespace-nowrap',
    'h-9 px-4 rounded-full',
    'text-xs font-medium tracking-tight transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
    isActive
      ? 'bg-white text-black border border-white'
      : 'bg-black text-white/80 border border-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-700'
  ].join(' ');

  // ---- Editable cell ------------------------------------------------------
  const EditableCell = ({ job, field, value, className, children }) => {
    const isEditing = editingCell?.jobId === job.id && editingCell?.field === field;

    return (
      <div className="relative">
        {isEditing && (
          <div
            ref={inputWrapRef}
            onMouseDown={(e) => e.stopPropagation()} // don't trigger outside-click while interacting
            className="fixed inset-x-4 top-20 z-50 bg-black border border-neutral-700 rounded-lg p-4 shadow-2xl sm:absolute sm:inset-x-auto sm:top-[-3rem] sm:left-0 sm:min-w-[220px]"
          >
            <input
              ref={inputElRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyPress}
              maxLength={25}
              className={[
                'w-full px-3 py-2 rounded-md',
                'bg-neutral-900 text-white placeholder:text-white/50',
                'border border-neutral-700',
                'outline-none focus:ring-2 focus:ring-white/20',
                'text-sm',
              ].join(' ')}
              placeholder={`Enter ${field}...`}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => { setEditingCell(null); setEditValue(''); }}
                className="px-3 py-1 text-xs text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 text-xs bg-white text-black rounded hover:bg-neutral-100"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div
          role="button"
          title="Click to edit"
          className={[
            className,
            'cursor-pointer rounded-md px-2 py-1 transition-all duration-150 border border-transparent',
            'hover:bg-white/15 hover:border-white/25 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]'
          ].join(' ')}
          onClick={() => handleCellClick(job.id, field, value)}
        >
          {children}
        </div>
      </div>
    );
  };

  // ---- Deadline cell ------------------------------------------------------
  const DeadlineCell = ({ job }) => {
    const isShowingCalendar = showCalendar === job.id;
    const hasDeadline = job.deadlineText;

    return (
      <div className="relative">
        {isShowingCalendar && (
          <div
            ref={calendarRef}
            className="fixed inset-x-4 top-20 z-50 bg-black border border-neutral-700 rounded-lg p-4 shadow-2xl sm:absolute sm:inset-x-auto sm:top-[-16rem] sm:left-0 sm:min-w-[280px]"
          >
            <div className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Select Deadline
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-white/50 font-medium py-2">
                  {day}
                </div>
              ))}
              {generateCalendarDays().map((date, index) => {
                const isToday = date && date.toDateString() === new Date().toDateString();
                return (
                  <button
                    key={index}
                    onClick={() => date && handleDateSelect(job.id, date)}
                    disabled={!date}
                    className={[
                      'aspect-square flex items-center justify-center rounded-md text-xs transition-colors',
                      date ? 'text-white hover:bg-white/10 cursor-pointer' : 'text-transparent cursor-default',
                      isToday ? 'bg-white text-black font-medium' : ''
                    ].join(' ')}
                  >
                    {date?.getDate()}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setShowCalendar(null)}
                className="px-3 py-1 text-xs text-white/60 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {hasDeadline ? (
          <div
            role="button"
            title="Click to change deadline"
            className="cursor-pointer rounded-md px-2 py-1 transition-all duration-150 border border-transparent hover:bg-white/15 hover:border-white/25"
            onClick={() => setShowCalendar(job.id)}
          >
            <Badges.Deadline badge={job.deadlineBadge} text={job.deadlineText} />
          </div>
        ) : (
          <div className="flex items-center">
            <button
              onClick={() => setShowCalendar(job.id)}
              className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-neutral-700 text-white/70 hover:text-white hover:border-neutral-600 hover:bg-white/10 transition-all duration-150"
              title="Add deadline"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    );
  };

  // ---- Mobile Actions Menu -----------------------------------------------
  const MobileActionsMenu = ({ job }) => {
    const isOpen = showMobileActions === job.id;

    return (
      <div className="relative">
        <button
          onClick={() => setShowMobileActions(isOpen ? null : job.id)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-700 text-white/70 hover:text-white hover:border-neutral-600 hover:bg-white/10 transition-all duration-150"
          title="More actions"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {isOpen && (
          <div
            ref={mobileActionsRef}
            className="absolute right-0 top-10 z-50 bg-black border border-neutral-700 rounded-lg shadow-2xl min-w-[160px] py-2"
          >
            <button
              onClick={() => {
                window.open(job.url, '_blank');
                setShowMobileActions(null);
              }}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
            >
              <ExternalLink className="h-4 w-4" />
              Open Job
            </button>
            <button
              onClick={() => {
                toggleApplied(job.id);
                setShowMobileActions(null);
              }}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
            >
              {job.applied ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              {job.applied ? 'Mark Unapplied' : 'Mark Applied'}
            </button>
            <button
              onClick={() => {
                setDeleteJob(job);
                setShowMobileActions(null);
              }}
              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
            >
              <Trash2 className="h-4 w-4" />
              Delete Job
            </button>
          </div>
        )}
      </div>
    );
  };

  // ---- Mobile Card Layout -------------------------------------------------
  const MobileJobCard = ({ job }) => (
    <div className="bg-black border border-neutral-800/50 rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <EditableCell
            job={job}
            field="company"
            value={job.company}
            className="font-medium text-white text-base leading-tight block"
          >
            <div className="truncate">{job.company || 'Company Name'}</div>
          </EditableCell>
          <EditableCell
            job={job}
            field="role"
            value={job.role}
            className="text-white/80 text-sm leading-snug mt-1 block"
          >
            <div className="line-clamp-2">{job.role || 'Job Role'}</div>
          </EditableCell>
        </div>
        <div className="ml-3 flex items-center gap-2">
          <Badges.Applied applied={job.applied} />
          <MobileActionsMenu job={job} />
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-white/50 text-xs uppercase tracking-wide font-medium mb-1">Location</div>
          <EditableCell
            job={job}
            field="location"
            value={job.location}
            className="text-white/80 text-sm"
          >
            <div className="truncate">{job.location || '—'}</div>
          </EditableCell>
        </div>
        <div>
          <div className="text-white/50 text-xs uppercase tracking-wide font-medium mb-1">Salary</div>
          <EditableCell
            job={job}
            field="salaryText"
            value={job.salaryText}
            className="text-white/80 text-sm"
          >
            <div className="truncate" title={job.salaryText || '—'}>
              {job.salaryText || '—'}
            </div>
          </EditableCell>
        </div>
        <div>
          <div className="text-white/50 text-xs uppercase tracking-wide font-medium mb-1">Experience</div>
          <div className="text-white/80 text-sm truncate">
            {job.experienceText || '—'}
          </div>
        </div>
        <div>
          <div className="text-white/50 text-xs uppercase tracking-wide font-medium mb-1">Deadline</div>
          <DeadlineCell job={job} />
        </div>
      </div>
    </div>
  );

  // ---- Render -------------------------------------------------------------
  return (
    <div className="px-1 sm:px-2 md:px-0">
      {/* Dark bento container */}
      <div
        className={[
          'rounded-3xl bg-black text-white',
          'border border-neutral-900/60 ring-1 ring-black/20',
          'shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)]',
          // Different overflow handling for mobile vs desktop
          'overflow-hidden sm:overflow-visible',
        ].join(' ')}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800/50">
          <div className="flex flex-col gap-4 items-start">
            {/* Search input */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-white/50" />
              </div>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search company, role, or location…"
                className={[
                  'w-full h-11 pl-11 pr-4 rounded-full',
                  'bg-black text-white placeholder:text-white/50',
                  'border border-neutral-800',
                  'outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-0',
                  'text-sm',
                ].join(' ')}
              />
            </div>

            {/* Filters - Horizontal scroll on mobile */}
            <div className="w-full">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <div className="flex gap-2 flex-shrink-0">
                  {['all', 'pending', 'applied', 'due'].map(k => (
                    <button
                      key={k}
                      onClick={() => setFilters(k)}
                      className={filterButton(filters === k)}
                    >
                      {k === 'all' ? 'All Jobs' : k === 'pending' ? 'Pending' : k === 'applied' ? 'Applied' : 'Due Soon'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Count */}
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
            <Filter className="h-3 w-3" />
            <span>{filteredJobs.length} jobs found</span>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead className="sticky top-0 bg-black border-b border-neutral-800/50">
                  <tr className="[&>th]:px-4 [&>th]:py-4 text-left text-white/70 text-xs font-medium uppercase tracking-wider">
                    <th className="w-[16%]">Company</th>
                    <th className="w-[28%]">Role</th>
                    <th className="w-[14%]">Location</th>
                    <th className="w-[12%]">Salary</th>
                    <th className="w-[8%]">Exp</th>
                    <th className="w-[10%]">Deadline</th>
                    <th className="w-[8%]">Status</th>
                    <th className="w-[4%] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center">
                        <div className="text-white/60">
                          <div className="text-2xl mb-2">🔍</div>
                          <div className="text-sm">No jobs found</div>
                          <div className="text-xs mt-1">Try adjusting your search or filters</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job, index) => (
                      <tr
                        key={job.id}
                        className={[
                          'hover:bg-white/[0.02] transition-colors duration-150',
                          index % 2 === 1 ? 'bg-white/[0.01]' : '',
                          'border-b border-neutral-800/30'
                        ].join(' ')}
                      >
                        <td className="px-4 py-4 align-top">
                          <EditableCell
                            job={job}
                            field="company"
                            value={job.company}
                            className="font-medium text-white text-sm leading-tight"
                          >
                            {job.company || '—'}
                          </EditableCell>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <EditableCell
                            job={job}
                            field="role"
                            value={job.role}
                            className="text-white text-sm leading-snug line-clamp-2 max-w-xs"
                          >
                            {job.role || '—'}
                          </EditableCell>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <EditableCell
                            job={job}
                            field="location"
                            value={job.location}
                            className="text-white/80 text-sm"
                          >
                            {job.location || '—'}
                          </EditableCell>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <EditableCell
                            job={job}
                            field="salaryText"
                            value={job.salaryText}
                            className="text-white/80 text-xs leading-tight break-words max-w-[8rem]"
                          >
                            <div title={job.salaryText || '—'}>
                              {job.salaryText || '—'}
                            </div>
                          </EditableCell>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="text-white/80 text-xs">
                            {job.experienceText || '—'}
                          </div>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <DeadlineCell job={job} />
                        </td>

                        <td className="px-4 py-4 align-top">
                          <Badges.Applied applied={job.applied} />
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => window.open(job.url, '_blank')}
                              className={darkButton}
                              title="Open job posting"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => toggleApplied(job.id)}
                              className={primaryButton}
                              title={job.applied ? 'Mark as not applied' : 'Mark as applied'}
                            >
                              {job.applied ? <X className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                            </button>
                            <button
                              onClick={() => setDeleteJob(job)}
                              className={dangerButton}
                              title="Delete job"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="block sm:hidden p-4 space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-white/60">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="text-sm">No jobs found</div>
                  <div className="text-xs mt-1">Try adjusting your search or filters</div>
                </div>
              </div>
            ) : (
              filteredJobs.map(job => (
                <MobileJobCard key={job.id} job={job} />
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        {filteredJobs.length > 0 && (
          <div className="px-4 sm:px-6 py-4 border-t border-neutral-800/50 bg-black">
            <div className="flex items-center justify-between text-xs text-white/60">
              <div>
                Showing {filteredJobs.length} of {jobs?.length || 0} jobs
              </div>
              <div className="flex items-center gap-4">
                <span>{filteredJobs.filter(j => j.applied).length} applied</span>
                <span>{filteredJobs.filter(j => !j.applied).length} pending</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <EditDrawer job={drawerJob} onClose={() => setDrawerJob(null)} />
      <ConfirmDelete job={deleteJob} onClose={() => setDeleteJob(null)} />
    </div>
  );
}
