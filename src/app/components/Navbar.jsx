"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Header shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      setOpen(false);
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div>
      <nav
        className={`bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b transition-all duration-300 ${
          isScrolled ? "border-black shadow-lg" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-full" />
              <span className="text-2xl font-bold tracking-tighter text-black">
                Jobsy
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-12">
              <button
                onClick={() => scrollToSection("features")}
                className="text-black hover:text-gray-500 font-medium tracking-tighter transition-colors text-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("privacy")}
                className="text-black hover:text-gray-500 font-medium tracking-tighter transition-colors text-lg"
              >
                Privacy
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-black hover:text-gray-500 font-medium tracking-tighter transition-colors text-lg"
              >
                How it works?
              </button>
              <Link href="/home">
                <button className="bg-black text-white px-8 py-3 rounded-full font-bold tracking-tighter hover:bg-gray-800 transition-all duration-200 border-2 border-black text-lg">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile hamburger (opens small dropdown) */}
            <button
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-300 text-black hover:bg-gray-50 transition"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Click-away overlay (subtle) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Small dropdown panel (animated top→bottom) */}
      <div
        id="mobile-menu"
        className={`
          fixed right-4 top-20 z-50 md:hidden
          w-[90%] max-w-xs rounded-2xl border bg-white shadow-2xl
          p-4
          origin-top
          transition-all duration-300 ease-out
          ${open ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full" />
            <span className="text-lg font-bold tracking-tighter text-white">Jobsy</span>
          </div>
          <button
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => scrollToSection("features")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-black font-medium tracking-tighter transition"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("privacy")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-black font-medium tracking-tighter transition"
          >
            Privacy
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-black font-medium tracking-tighter transition"
          >
            How it works?
          </button>

          <Link href="/home" onClick={() => setOpen(false)}>
            <button className="mt-2 w-full bg-black text-white px-5 py-3 rounded-full font-bold tracking-tighter hover:bg-gray-800 transition-all duration-200 border-2 border-black">
              Get Started
            </button>
          </Link>
        </div>

        <div className="text-center mt-3 pt-2 border-t border-gray-400 text-[10px] text-gray-800">
          <p className="px-1">No login. Absoultely free. Takes 3 seconds to start.</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
