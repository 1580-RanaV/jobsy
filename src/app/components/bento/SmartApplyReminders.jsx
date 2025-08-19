// components/bento/SmartApplyReminders.jsx
export default function SmartApplyReminders() {
  return (
    <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
      <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
        <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h3 className="mb-3 text-3xl font-bold leading-tight">Smart Apply Reminders</h3>
      <p className="mb-6 text-base font-medium text-neutral-200">
        Never miss a deadline. Get alerts one day before an application closes, right in the tracker.
      </p>

      <div className="flex flex-wrap gap-2 text-xs">
        {["Deadline Alerts","Color-coded Warnings","Stay on Track"].map((p) => (
          <span key={p} className="rounded-full bg-white/10 px-4 py-1">{p}</span>
        ))}
      </div>
    </div>
  )
}
