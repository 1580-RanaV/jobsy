// components/export-button.js
"use client";
import React from "react";
import { toCSV } from "@/app/lib/csv";
import { useJobs } from "@/app/hooks/use-jobs";
import PillButton from "./pill-button";

export default function ExportButton({ className = "" }) {
  const { jobs } = useJobs();

  function dlJSON() {
    const blob = new Blob([JSON.stringify(jobs, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "applications.json";
    a.click();
  }

  function dlCSV() {
    const blob = new Blob([toCSV(jobs)], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "applications.csv";
    a.click();
  }

  return (
    <div className={`flex gap-1.5 sm:gap-2 ${className}`}>
      <PillButton onClick={dlJSON}>
        <span className="block sm:hidden">JSON</span>
        <span className="hidden sm:block">Export JSON</span>
      </PillButton>
      <PillButton onClick={dlCSV}>
        <span className="block sm:hidden">CSV</span>
        <span className="hidden sm:block">Export CSV</span>
      </PillButton>
    </div>
  );
}
