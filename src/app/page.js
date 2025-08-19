"use client";

import { useEffect, useState } from "react";

// ── Page Sections & Components ────────────────────────────────────────────────
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FirstCard from "./components/FirstCard";

// Features (Bento grid)
import SectionHeader from "./components/bento/SectionHeader";
import InactiveDetection from "./components/bento/InactiveDetection";
import AutoCapturePaste from "./components/bento/AutoCapturePaste";
import SmartExtraction from "./components/bento/SmartExtraction";
import SmartAlerts from "./components/bento/SmartAlerts";
import PrivacyLocal from "./components/bento/PrivacyLocal";
import ClipboardWatch from "./components/bento/ClipboardWatch";
import ExportImport from "./components/bento/ExportImport";
import SmartApplyReminders from "./components/bento/SmartApplyReminders";

// Spotlight sections
import ThreeStep from "./components/ThreeSteps/ThreeStep";
import WhyJobsyWorks from "./components/why/WhyJobsyWorks";
import ExportSection from "./components/export/ExportSection";

// CTA + Footer
import CTA from "./components/CTA";
import Footer from "./components/Footer";

// ──────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track page scroll (pass to Navbar if you want style changes on scroll)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth-scroll helper (call from nav buttons/links)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white font-inter">
      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      {/* If Navbar needs scroll state, pass: <Navbar isScrolled={isScrolled} /> */}
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-32 pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <HeroSection />

          {/* Stats / quick highlights under hero */}
          <FirstCard />
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12" />

      {/* ── Features: Bento Grid ───────────────────────────────────────────── */}
      <section id="features" className="py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <SectionHeader />

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Row 1 */}
            <InactiveDetection />

            {/* Row 2 */}
            <AutoCapturePaste />
            <SmartExtraction />

            {/* Row 3 */}
            <SmartAlerts />
            <PrivacyLocal />

            {/* Row 4 */}
            <ClipboardWatch />
            <ExportImport />
            <SmartApplyReminders />
          </div>
        </div>
      </section>

      {/* ── Step-by-Step Process ───────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white py-32">
        <ThreeStep />
      </section>

      {/* ── Spotlight: Why Jobsy Works ─────────────────────────────────────── */}
      {/* Renders its own <section>, so no wrapper section here */}
      <WhyJobsyWorks />

      {/* ── Export / Import Section ────────────────────────────────────────── */}
      {/* Renders its own <section>, so no wrapper section here */}
      <ExportSection />

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <CTA />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
