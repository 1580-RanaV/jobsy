import React from 'react'

const HeroSection = () => {
  return (
    <div>
      <div className="relative bg-white rounded-t-3xl pt-16 pb-20 text-center max-w-6xl mx-auto px-4">
        {/* subtle glow */}
        {/* <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(700px 350px at 50% 0%, rgba(0,0,0,0.05), transparent 60%)',
          }}
        /> */}

        {/* Hero Heading */}
        <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-neutral-900 leading-[1.05] mb-6">
          The smarter
          <br />
          <span className="block">way to</span>
          job hunt.
        </h1>

        {/* Subtext */}
        <p className="relative text-base sm:text-lg md:text-xl text-neutral-600 font-medium tracking-tight max-w-3xl mx-auto mb-10">
          Drop any job link — Check if it’s legit — Chase real opportunities
        </p>

        {/* CTA row */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="/home"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-neutral-900 text-white border border-neutral-900 font-medium text-lg tracking-tight hover:bg-black transition-transform duration-200 hover:scale-105"
          >
            Start tracking jobs
          </a>
          <button className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-neutral-900 border border-neutral-200 font-medium text-lg tracking-tight hover:bg-neutral-50 transition-transform duration-200 hover:scale-105">
            See demo
          </button>
        </div>

        {/* reassurance line */}
        <div className="relative flex flex-col items-center gap-3 text-xs sm:text-sm lg:text-lg text-neutral-600 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-900"></span>
            No login. Local-first.
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-900"></span>
            Identify inactive job postings.
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-900"></span>
            Export / Import anytime.
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-900"></span>
            Clipboard Watch support.
          </span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
