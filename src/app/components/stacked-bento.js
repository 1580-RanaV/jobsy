// components/sections/stacked-bento.js
import React from "react";
import BentoCard from "@/components/ui/bento-card";

export default function StackedBento() {
  return (
    <div className="space-y-4 sm:space-y-5">
      <BentoCard title="Clipboard Watch" subtitle="Private, local-first.">
        <p className="text-neutral-300 text-sm leading-relaxed">
          Monitor copied links and auto-capture job details securely.
        </p>
      </BentoCard>
      <BentoCard accent="indigo" title="Smart Extraction" subtitle="Zero setup.">
        <p className="text-neutral-300 text-sm leading-relaxed">
          Parse role, company, location, and eligibility in seconds.
        </p>
      </BentoCard>
      <BentoCard accent="purple" title="Export / Import" subtitle="Own your data.">
        <p className="text-neutral-300 text-sm leading-relaxed">
          One-click JSON/CSV export. Re-import anytime.
        </p>
      </BentoCard>
    </div>
  );
}
