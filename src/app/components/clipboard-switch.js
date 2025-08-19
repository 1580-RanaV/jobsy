// components/clipboard-switch.js
"use client";
import React from "react";
import { useClipboardWatch } from "@/app/hooks/use-clipboard-watch";
import PillButton from "./pill-button";

export default function ClipboardSwitch({ className = "" }) {
  const { watching, toggle } = useClipboardWatch();

  return (
    <PillButton onClick={toggle} aria-pressed={watching} className={className}>
      <span className="block sm:hidden">
        {watching ? "Stop" : "Clipboard"}
      </span>
      <span className="hidden sm:block">
        {watching ? "Stop Watch" : "Enable Clipboard Watch"}
      </span>
    </PillButton>
  );
}
