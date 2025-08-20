// components/job-table.js
'use client';

import { useJobs } from '@/app/hooks/use-jobs';
import EditDrawer from './edit-drawer';
import ConfirmDelete from './confirm-delete';
import Badges from './badges';
import { useState } from 'react';
import { Search, Filter, ExternalLink, Edit3, Trash2, Check, X } from 'lucide-react';

export default function JobTable({ search, setSearch, filters, setFilters }) {
  const { jobs, toggleApplied } = useJobs();
  const [drawerJob, setDrawerJob] = useState(null);
  const [deleteJob, setDeleteJob] = useState(null);

  function normalizeDeadline(job) {
  if (!job) return job;
  const out = { ...job };

  // If no pretty text but ISO exists, derive it
  if (!out.deadlineText && out.deadline) {
    const d = new Date(out.deadline);
    if (!isNaN(d)) {
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yy = d.getFullYear();
      out.deadlineText = `${dd}/${mm}/${yy}`;

      // badge (overdue / due (≤7 days) / ok)
      const today = new Date(); today.setHours(12,0,0,0);
      const tgt = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
      const days = Math.floor((tgt - today) / (1000*60*60*24));
      out.deadlineBadge = days < 0 ? 'overdue' : days <= 7 ? 'due' : 'ok';
    }
  }

  return out;
}


  function filtered() {
  let list = (jobs || []).map(normalizeDeadline); // <— added
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

  // Dark button styles matching your bento theme
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
    'inline-flex items-center justify-center',
    'h-9 px-4 rounded-full',
    'text-xs font-medium tracking-tight transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
    isActive 
      ? 'bg-white text-black border border-white'
      : 'bg-black text-white/80 border border-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-700'
  ].join(' ');

  return (
    <div className="px-1 sm:px-2 md:px-0">
      {/* Dark bento container */}
      <div className={[
        'rounded-3xl bg-black text-white',
        'border border-neutral-900/60 ring-1 ring-black/20',
        'shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)]',
        'overflow-hidden',
      ].join(' ')}>
        
        {/* Header with search and filters */}
        <div className="p-4 sm:p-6 border-b border-neutral-800/50">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search input */}
            <div className="relative flex-1 w-full sm:max-w-sm">
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

            {/* Filter buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
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

          {/* Results count */}
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
            <Filter className="h-3 w-3" />
            <span>{filteredJobs.length} jobs found</span>
          </div>
        </div>

        {/* Table container */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
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
                      <div className="font-medium text-white text-sm leading-tight">
                        {job.company || '—'}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="text-white text-sm leading-snug line-clamp-2 max-w-xs">
                        {job.role || '—'}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="text-white/80 text-sm">
                        {job.location || '—'}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div 
                        className="text-white/80 text-xs leading-tight break-words max-w-[8rem]" 
                        title={job.salaryText || '—'}
                      >
                        {job.salaryText || '—'}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="text-white/80 text-xs">
                        {job.experienceText || '—'}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Badges.Deadline badge={job.deadlineBadge} text={job.deadlineText} />
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Badges.Applied applied={job.applied} />
                    </td>
                    <td className="px-4 py-4 align-top">
                      {/* Desktop: Horizontal icons */}
                      <div className="hidden sm:flex justify-center gap-1.5">
                        <button 
                          onClick={() => window.open(job.url, '_blank')} 
                          className={darkButton}
                          title="Open job posting"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => setDrawerJob(job)} 
                          className={darkButton}
                          title="Edit job details"
                        >
                          <Edit3 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => setDeleteJob(job)} 
                          className={dangerButton}
                          title="Delete job"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => toggleApplied(job.id)} 
                          className={primaryButton}
                          title={job.applied ? 'Mark as not applied' : 'Mark as applied'}
                        >
                          {job.applied ? <X className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                        </button>
                      </div>

                      {/* Mobile: Stacked buttons with labels */}
                      <div className="flex sm:hidden flex-col gap-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open(job.url, '_blank')} 
                            className={[
                              'flex-1 inline-flex items-center justify-center gap-2',
                              'h-9 px-3 rounded-full',
                              'text-xs font-medium tracking-tight',
                              'bg-black text-white border border-neutral-800',
                              'hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-200',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                            ].join(' ')}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Open</span>
                          </button>
                          <button 
                            onClick={() => setDrawerJob(job)} 
                            className={[
                              'flex-1 inline-flex items-center justify-center gap-2',
                              'h-9 px-3 rounded-full',
                              'text-xs font-medium tracking-tight',
                              'bg-black text-white border border-neutral-800',
                              'hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-200',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                            ].join(' ')}
                          >
                            <Edit3 className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setDeleteJob(job)} 
                            className={[
                              'flex-1 inline-flex items-center justify-center gap-2',
                              'h-9 px-3 rounded-full',
                              'text-xs font-medium tracking-tight',
                              'bg-red-600 text-white border border-red-600',
                              'hover:bg-red-700 hover:border-red-700 transition-all duration-200',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20',
                            ].join(' ')}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                          <button 
                            onClick={() => toggleApplied(job.id)} 
                            className={[
                              'flex-1 inline-flex items-center justify-center gap-2',
                              'h-9 px-3 rounded-full',
                              'text-xs font-medium tracking-tight',
                              'bg-white text-black border border-white',
                              'hover:bg-neutral-100 transition-all duration-200',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20',
                            ].join(' ')}
                          >
                            {job.applied ? (
                              <>
                                <X className="h-4 w-4" />
                                <span>Unapply</span>
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4" />
                                <span>Applied</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with summary */}
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