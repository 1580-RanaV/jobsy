// components/import-dialog.js
"use client";
import React from "react";
import { toast } from "sonner";
import PillButton from "./pill-button";

export default function ImportDialog({ className = "" }) {
  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const txt = await f.text();
    try {
      const arr = JSON.parse(txt);
      for (const j of arr) {
        window.dispatchEvent(new CustomEvent("jobs:add", { detail: j }));
      }
      toast.success("Imported.");
    } catch {
      toast.error("Invalid JSON");
    }
  }

  return (
    <label className={className}>
      <PillButton as="span">Import</PillButton>
      <input type="file" accept="application/json" hidden onChange={handleFile} />
    </label>
  );
}
