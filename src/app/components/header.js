// components/header.js
import React from "react";
import ExportButton from "./export-button";
import ImportDialog from "./import-dialog";
import ClipboardSwitch from "./clipboard-switch";
import Link from "next/link";

export default function Header({ compact }) {
  return (
    <header className="sticky top-3 z-40">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto w-full lg:w-[min(100%,62rem)]">
          <div
            className={[
              "rounded-3xl bg-black text-white border border-black/10",
              "backdrop-blur shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)]",
              "px-3 sm:px-4 md:px-6 lg:px-8",
              "py-6 sm:py-6",
              "flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4",
            ].join(" ")}
          >
            {/* Brand */}
            <Link
              href="/"
              aria-label="Jobsy Home"
              className="flex items-center gap-2 md:gap-3"
            >
              <div className="h-6 w-6 md:h-7 md:w-7 rounded-full bg-white" />
              <span className="font-bold tracking-tight text-white text-base md:text-2xl">
                Jobsy
              </span>
            </Link>

            {/* Mobile layout: buttons stack below brand */}
            {!compact && (
              <div className="flex flex-wrap md:hidden justify-center gap-2 w-full">
                <ClipboardSwitch />
                <ExportButton />
                <ImportDialog />
              </div>
            )}

            {/* Desktop spacer */}
            <div className="hidden md:block flex-1" />

            {/* Desktop actions inline */}
            {!compact && (
              <div className="hidden md:flex items-center gap-2 lg:gap-3">
                <ClipboardSwitch />
                <ExportButton />
                <ImportDialog />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
