// app/home/page.js
'use client';

import Header from '@/app/components/header';
import AddBar from '@/app/components/add-bar';
import AlertsStack from '@/app/components/alerts-stack';
import JobTable from '@/app/components/job-table';
import NotificationsBanner from '@/app/components/notifications-banner';
import EmptyState from '@/app/components/empty-state';
import { useJobs } from '@/app/hooks/use-jobs';
import { useDeadlineAlerts } from '@/app/hooks/use-deadline-alerts';
import { useEffect } from 'react';

export default function HomePage() {
  const { jobs, hydrated, search, setSearch, filters, setFilters } = useJobs();
  useDeadlineAlerts(jobs);

  useEffect(() => { /* ask notification permission after first job exists */ }, [jobs?.length]);

  const hasJobs = hydrated && jobs.length > 0;

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-4 relative">
        <AlertsStack jobs={jobs} />

        <div className="p-4 md:p-5 bg-black rounded-3xl mt-8 mb-14">
          <AddBar />
        </div>

        <NotificationsBanner jobs={jobs} />
        <div className="card p-0 overflow-hidden">
          {hasJobs ? (
            <JobTable search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}