// components/ui/dark-ghost-button.js
import React from "react";

export default function DarkGhostButton({ className = "", children, ...props }) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center whitespace-nowrap",
        "rounded-xl px-3.5 sm:px-4 md:px-5 h-9 sm:h-10 md:h-11",
        "text-xs sm:text-sm font-medium tracking-tight",
        "bg-transparent text-white/90 border border-white/10",
        "hover:bg-white/5 transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
