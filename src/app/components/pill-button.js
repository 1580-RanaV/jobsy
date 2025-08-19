// components/ui/pill-button.js
import React from "react";

export default function PillButton({
  as = "button",
  className = "",
  children,
  ...props
}) {
  const Cmp = as;
  return (
    <Cmp
      className={[
        "inline-flex items-center justify-center whitespace-nowrap",
        "rounded-full px-3.5 sm:px-4 md:px-5 h-9 sm:h-10 md:h-11",
        "text-xs sm:text-sm font-medium tracking-tight",
        // white button with black text
        "bg-white text-black border border-black/10",
        // soft hover & focus
        "hover:bg-neutral-100 transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15",
        // subtle depth
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_20px_-10px_rgba(0,0,0,0.25)]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Cmp>
  );
}
