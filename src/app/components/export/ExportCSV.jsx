// components/export/ExportCSV.jsx
export default function ExportCSV() {
  return (
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

      <div className="mt-5 flex flex-wrap gap-2 text-xs">
        <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white transition-colors hover:bg-white/15">
          Download CSV
        </button>
        <span className="rounded-full bg-white/10 px-3 py-1">Comma-separated</span>
        <span className="rounded-full bg-white/10 px-3 py-1">Sheet-friendly</span>
      </div>
    </div>
  )
}
