"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <nav
        className={`bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b transition-all duration-300 ${
          isScrolled ? "border-black shadow-lg" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href = "/">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-full"></div>
              <span className="text-2xl font-bold tracking-tighter text-black">
                Jobsy
              </span>
            </div>
            </Link>
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
