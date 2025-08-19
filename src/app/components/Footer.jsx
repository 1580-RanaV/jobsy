import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div>
        <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-black rounded-full"></div>
                <span className="text-3xl font-bold tracking-tighter text-black">Jobsy</span>
              </div>
              <p className="text-black text-xl tracking-tighter font-medium max-w-md leading-relaxed">
                The simplest way to track job applications and never miss a deadline again.
              </p>
              <div className="mt-8">
                <Link href="/home">
                  <button className="bg-black text-white px-8 py-3 rounded-full font-bold tracking-tighter hover:bg-gray-800 transition-colors">
                    Get started for free
                  </button>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold tracking-tighter mb-6 text-black">Product</h4>
              <div className="space-y-4">
                
                <button
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  <Link href="/features">
                  Features
                  </Link>
                </button>
                <button
                  onClick={() => scrollToSection('privacy')}
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Privacy
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  How it works
                </button>
                <button
                  onClick={() => scrollToSection('export')}
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Export data
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold tracking-tighter mb-6 text-black">Support</h4>
              <div className="space-y-4">
                <a
                  href="mailto:help@jobsy.com"
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  help@jobsy.com
                </a>
                <a
                  href="/privacy-policy"
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/system-status"
                  className="block text-black hover:text-gray-600 text-lg tracking-tighter font-medium transition-colors"
                >
                  System Status
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-black text-lg tracking-tighter font-medium mb-4 md:mb-0">
                © 2025 Jobsy. Built with privacy in mind.
              </div>
              <div className="text-black text-lg tracking-tighter font-medium">
                Your data never leaves your browser.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer