"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Features() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Features Section */}
      <section id="features" className="py-20 pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-20 text-center">
            <h1 className="mb-6 text-6xl font-bold text-neutral-900 md:text-8xl">
              All the ways Jobsy helps you win
            </h1>
            <p className="mx-auto max-w-4xl text-xl font-medium text-neutral-600">
              From instant job capture to deadline alerts — every feature is
              designed to save you time, keep you organized, and make job
              tracking effortless.
            </p>
          </div>

          {/* Feature list grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* 1 — Inactive/Filled Job Detection */}
            <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-4">
                  <svg
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
                    />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Time saver
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-bold">
                Smart Inactive Link Blocking
              </h3>
              <p className="text-neutral-300 text-sm">
                Instantly detects job postings that are closed, filled, or no
                longer accepting applications before they get added to your
                tracker. Saves you from chasing dead ends and keeps your
                workspace clean.
              </p>
            </div>

            {/* 2 — One-click Job Capture */}
            <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-4">
                  <svg
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5h6M7 9h10M7 13h10M9 17h6"
                    />
                  </svg>
                </div>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                  Fast
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-bold">One-click Job Capture</h3>
              <p className="text-neutral-300 text-sm">
                Paste a job posting link and instantly extract the role,
                company, location, salary, and deadline. Works with most ATS
                and company career sites without login.
              </p>
            </div>

            {/* 3 — Clipboard Auto-detect */}
            <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-4">
                  <svg
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16h8M8 12h8m-6 8h4m1-20H7a2 2 0 00-2 2v16l4-4h10a2 2 0 002-2V4a2 2 0 00-2-2z"
                    />
                  </svg>
                </div>
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
                  Handy
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-bold">Clipboard Auto-detect</h3>
              <p className="text-neutral-300 text-sm">
                Click “From Clipboard” and Jobsy grabs the last URL you copied
                — perfect for rapid job entry while browsing.
              </p>
            </div>

            {/* 4 — Deadline Reminders */}
            <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-4">
                  <svg
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-300">
                  Alert
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-bold">Deadline Reminders</h3>
              <p className="text-neutral-300 text-sm">
                Get visual alerts when an application deadline is approaching —
                never miss your window to apply.
              </p>
            </div>

            {/* 5 — Structured Job Cards */}
            <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-4">
                  <svg
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-300">
                  Organized
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-bold">Structured Job Cards</h3>
              <p className="text-neutral-300 text-sm">
                Every saved job gets its own clean, info-packed card with all
                the extracted details — easy to scan, sort, and track.
              </p>
            </div>

            {/* 6 — No Login Needed */}
            <div className="rounded-3xl bg-neutral-950 p-10 text-white shadow-2xl ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-4">
                  <svg
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300">
                  Simple
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-bold">No Login, No Setup</h3>
              <p className="text-neutral-300 text-sm">
                Start tracking jobs instantly — no sign-up forms, no passwords,
                just paste and go.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
