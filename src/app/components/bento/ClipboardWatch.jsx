// components/bento/ClipboardWatch.jsx
export default function ClipboardWatch() {
  return (
    <div className="rounded-3xl bg-neutral-950 p-12 text-white shadow-2xl ring-1 ring-white/10">
      <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4">
        <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
        </svg>
      </div>

      <h3 className="mb-3 text-3xl font-bold leading-tight">Clipboard watch</h3>
      <p className="mb-6 text-base font-medium text-neutral-200">
        Keep the tab open and we auto-capture copied job links every few seconds. Zero extra steps.
      </p>

      <div className="rounded-xl bg-white/10 px-4 py-3 text-sm text-neutral-100">
        Works while this tab is visible.
      </div>
    </div>
  )
}
