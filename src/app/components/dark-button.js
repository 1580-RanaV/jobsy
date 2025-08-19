// components/ui/dark-button.js
import React from "react";

export default function DarkButton({ as = "button", className = "", children, ...props }) {
  const Cmp = as;
  return (
    <Cmp
      className={[
        "inline-flex items-center justify-center whitespace-nowrap",
        "rounded-xl px-3.5 sm:px-4 md:px-5 h-9 sm:h-10 md:h-11",
        "text-xs sm:text-sm font-medium tracking-tight",
        "bg-neutral-900 text-white border border-white/10",
        "hover:bg-neutral-800 transition",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_6px_20px_-10px_rgba(0,0,0,0.7)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        "ring-1 ring-white/5",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Cmp>
  );
}
