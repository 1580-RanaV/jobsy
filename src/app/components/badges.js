// components/badges.js
export default function Badges() {}

function Chip({ className = '', children }) {
  return (
    <span
      className={
        `inline-flex items-center justify-center whitespace-nowrap
         rounded-full border px-3 py-1 text-xs font-medium ` + className
      }
    >
      {children}
    </span>
  );
}

function Applied({ applied }) {
  return applied ? (
    <Chip className="min-w-[96px] bg-green-600 text-white border-green-600 py-2">
      Applied
    </Chip>
  ) : (
    <Chip className="min-w-[96px] bg-red-600 text-white border-red-600 py-2">
      Not applied
    </Chip>
  );
}

function Deadline({ badge, text }) {
  if (!text) return <span>—</span>;
  const map = {
    overdue: 'bg-red-100 text-red-700 border-red-200',
    due: 'bg-amber-100 text-amber-700 border-amber-200',
    ok: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  };
  return <Chip className={map[badge] || map.ok}>{text}</Chip>;
}

Badges.Applied = Applied;
Badges.Deadline = Deadline;
