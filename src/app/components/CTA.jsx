import React from 'react'
import Link from 'next/link'

const CTA = () => {
  return (
    <div>
         <section className="py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 rounded-3xl">
          <div className="rounded-3xl ring-1 ring-white/10 shadow-2xl bg-black p-12 text-center">
            {/* Heading */}
            <h2 className="text-5xl leading-none md:text-7xl font-bold text-white mb-6">
              Ready to land <br className="hidden sm:block" /> your next job?
            </h2>
            <p className="text-xl md:text-xl text-neutral-300 font-medium tracking-tighter max-w-3xl mx-auto mb-12">
              Start tracking your job applications in just 10 seconds <br></br>—<br></br> no signup, no hassle.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/home">
                <button className="rounded-full bg-white text-black px-14 py-5 text-lg md:text-xl font-bold tracking-tighter hover:bg-neutral-100 transition-all duration-200 hover:scale-105">
                  Go to jobsy.com/home
                </button>
              </Link>
              <span className="text-sm md:text-base text-neutral-400 font-medium tracking-tighter">
                Takes 3 seconds to paste your first job
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default CTA
