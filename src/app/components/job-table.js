// components/job-table.js
'use client';

import { useJobs } from '@/app/hooks/use-jobs';
import EditDrawer from './edit-drawer';
import ConfirmDelete from './confirm-delete';
import Badges from './badges';
import { useState } from 'react';

export default function JobTable({ search, setSearch, filters, setFilters }) {
  const { jobs, toggleApplied } = useJobs();
  const [drawerJob, setDrawerJob] = useState(null);
  const [deleteJob, setDeleteJob] = useState(null);

  function filtered() {
    let list = jobs || [];
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

  const btnBase =
    'inline-flex items-center justify-center h-9 px-3 rounded-lg text-sm font-medium leading-none transition focus:outline-none focus:ring-2';
  const btnGhost =
    `${btnBase} bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 focus:ring-black/10`;
  const btnDanger =
    `${btnBase} bg-red-600 text-white border border-red-600 hover:bg-red-700 focus:ring-red-500/30`;
  const btnPrimary =
    `${btnBase} bg-neutral-900 text-white border border-neutral-900 hover:bg-black focus:ring-black/20`;

  return (
    <div className="overflow-auto">
      <div className="p-4 border-b border-neutral-200 flex items-center gap-2 md:gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search company, role, or location…"
          className="h-10 w-full md:w-96 rounded-lg border border-neutral-200 px-3 outline-none focus:ring-2 focus:ring-black/20"
        />
        <div className="hidden md:flex gap-2">
          {['all', 'pending', 'applied', 'due'].map(k => (
            <button
              key={k}
              onClick={() => setFilters(k)}
              className={`h-10 px-3 rounded-lg border text-sm ${
                filters === k
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {k === 'all' ? 'All' : k === 'pending' ? 'Pending' : k === 'applied' ? 'Applied' : 'Due soon'}
            </button>
          ))}
        </div>
      </div>

      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-white border-b border-neutral-200">
          <tr className="[&>th]:px-4 [&>th]:py-3 text-left text-neutral-600">
            <th className="w-[14%]">Company</th>
            <th className="w-[36%]">Role</th>
            <th className="w-[14%]">Location</th>
            <th className="w-[10%]">Salary</th>
            <th className="w-[8%]">Exp</th>
            <th className="w-[10%]">Deadline</th>
            <th className="w-[8%]">Applied</th>
            <th className="w-[20%] text-right pr-4">Actions</th>
          </tr>
        </thead>
        <tbody className="[&>tr:nth-child(odd)]:bg-neutral-50/30">
          {filtered().map(job => (
            <tr key={job.id} className="hover:bg-neutral-50">
              <td className="px-4 py-3 align-top">
                <div className="font-medium text-neutral-900">{job.company || '—'}</div>
              </td>
              <td className="px-4 py-3 align-top">
                <div className="text-neutral-900 leading-snug line-clamp-2">{job.role || '—'}</div>
              </td>
              <td className="px-4 py-3 align-top">{job.location || '—'}</td>
              <td className="px-4 py-3 align-top">{job.salaryText || '—'}</td>
              <td className="px-4 py-3 align-top">{job.experienceText || '—'}</td>
              <td className="px-4 py-3 align-top">
                <Badges.Deadline badge={job.deadlineBadge} text={job.deadlineText} />
              </td>
              <td className="px-4 py-3 align-top">
                <Badges.Applied applied={job.applied} />
              </td>
              <td className="px-4 py-3 align-top">
                <div className="flex justify-end gap-2">
                  <button onClick={() => window.open(job.url, '_blank')} className={btnGhost}>
                    Open
                  </button>
                  <button onClick={() => setDrawerJob(job)} className={btnGhost}>
                    Edit
                  </button>
                  <button onClick={() => setDeleteJob(job)} className={btnDanger}>
                    Delete
                  </button>
                  <button onClick={() => toggleApplied(job.id)} className={btnPrimary}>
                    {job.applied ? 'Not applied' : 'Mark applied'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditDrawer job={drawerJob} onClose={() => setDrawerJob(null)} />
      <ConfirmDelete job={deleteJob} onClose={() => setDeleteJob(null)} />
    </div>
  );
}
