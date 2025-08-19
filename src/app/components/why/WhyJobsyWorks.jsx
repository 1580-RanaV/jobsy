// components/why/WhyJobsyWorks.jsx
import SectionHeader from "./WhyWorks"
import SmartAI from "./SmartAI"
import PrivacyFocus from "./PrivacyFocus"
import SmartReminders from "./SmartReminders"
import Divider from "./Divider"

export default function WhyJobsyWorks() {
  return (
    <section className="py-32">
      <SectionHeader />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
          <div className="space-y-12">
            <SmartAI />
            <Divider />
            <PrivacyFocus />
            <Divider />
            <SmartReminders />
          </div>
        </div>
      </div>
    </section>
  )
}
