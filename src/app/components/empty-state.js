// components/empty-state.js
export default function EmptyState() {
  return (
    <div className="px-6 py-12 text-center rounded-3xl bg-black border-2 border-white/10 text-white shadow-lg">
      {/* Icon / placeholder box */}
      <div className="mx-auto h-12 w-12 rounded-2xl bg-white/10 mb-4" />

      {/* Title */}
      <h3 className="font-semibold text-base md:text-lg">No applications yet</h3>

      {/* Subtitle */}
      <p className="text-sm text-white/60 mt-1 max-w-sm mx-auto">
        Paste a job link or enable Clipboard Watch to auto-save copied links.
      </p>
    </div>
  );
}
