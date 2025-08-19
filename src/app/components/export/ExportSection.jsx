// components/export/ExportSection.jsx
import SectionHeader from "./SectionHeader"
import ExportCSV from "./ExportCSV"
import ExportJSON from "./ExportJSON"
import ImportRestore from "./ImportRestore"
import FooterHint from "./FooterHint"

export default function ExportSection() {
  return (
    <section id="export" className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
          <SectionHeader />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <ExportCSV />
            <ExportJSON />
            <ImportRestore />
          </div>

          <FooterHint />
        </div>
      </div>
    </section>
  )
}
