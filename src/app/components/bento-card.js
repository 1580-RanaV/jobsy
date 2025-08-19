// components/ui/bento-card.js
import React from "react";

export default function BentoCard({
  title,
  subtitle,
  children,
  accent = "emerald", // "emerald" | "indigo" | "purple"
  className = "",
}) {
  const ring =
    accent === "indigo"
      ? "ring-indigo-400/20"
      : accent === "purple"
      ? "ring-purple-400/20"
      : "ring-emerald-400/20";

  return (
    <section
      className={[
        "relative rounded-3xl border border-white/10",
        "bg-neutral-900/60 backdrop-blur",
        "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]",
        "ring-1", ring,
        "p-5 sm:p-6 md:p-7",
        "before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none",
        "before:bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]",
        className,
      ].join(" ")}
    >
      <div className="space-y-1.5">
        <h3 className="text-white tracking-tight font-semibold text-base sm:text-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="text-neutral-400 tracking-tight text-xs sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
}
