// components/sections/grid-bento.js
import React from "react";
import BentoCard from "@/components/ui/bento-card";

export default function GridBento() {
  return (
    <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <BentoCard title="Apply Reminders" subtitle="Never miss deadlines." />
      <BentoCard accent="indigo" title="Inactive Detector" subtitle="Skip dead listings." />
      <BentoCard accent="emerald" title="Privacy Local" subtitle="No cloud. No tracking." />
      <BentoCard accent="purple" title="Insights" subtitle="See gaps at a glance." />
      <BentoCard title="Clipboard Watch" subtitle="Instant capture." />
      <BentoCard accent="indigo" title="Exports" subtitle="CSV / JSON." />
    </div>
  );
}
