// components/empty-state.js
export default function EmptyState(){
  return (
    <div className="px-6 py-12 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-neutral-100 mb-3" />
      <h3 className="font-semibold">No applications yet</h3>
      <p className="text-neutral-600 text-sm">Paste a job link or enable Clipboard Watch to auto-save copied links.</p>
    </div>
  );
}
