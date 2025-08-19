// components/bento/AutoCapturePaste.jsx
const JOB_BOARDS = [
  "LinkedIn","Indeed","Naukri","Foundit","Glassdoor","ZipRecruiter",
  "Monster","Wellfound (AngelList)","Hired","Dice","Instahyre","Freshersworld",
]
const ATS = [
  "Greenhouse","Lever","Ashby","Workable","SmartRecruiters","iCIMS",
  "Taleo","Workday","JazzHR","BambooHR","Zoho Recruit","SAP SuccessFactors",
]
const COMPANIES = [
  "Google","Microsoft","Amazon","Netflix","Stripe","Airbnb","Shopify",
  "Adobe","Atlassian","Uber","Flipkart","Swiggy","Zomato","TCS","Infosys",
]

export default function AutoCapturePaste() {
  return (
    <div className="lg:col-span-2 rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
      <div className="mb-8 flex items-start justify-between">
        <div className="rounded-2xl bg-white/10 p-4">
          <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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

      <div className="space-y-5 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
        <div>
          <div className="mb-3 text-xs font-semibold text-neutral-300">Works with job boards</div>
          <PillRow items={JOB_BOARDS} />
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="mb-3 text-xs font-semibold text-neutral-300">ATS and company career platforms</div>
          <PillRow items={ATS} />
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="mb-3 text-xs font-semibold text-neutral-300">Company career pages</div>
          <PillRow items={[...COMPANIES, "+ Many more"]} />
        </div>
      </div>
    </div>
  )
}

function PillRow({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((label) => (
        <span key={label} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
          {label}
        </span>
      ))}
    </div>
  )
}
