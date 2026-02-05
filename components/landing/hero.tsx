"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="min-h-screen px-4 py-12 flex items-center justify-center bg-slate-900">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Public Opinion Poll • Nepal 2081</p>
          </div>
        </div>

        {/* Main Heading - Professional */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Nepal Election 2081
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-lg mx-auto font-light">
            Discover candidates in your region and see what voters think
          </p>
        </div>

        {/* Feature Cards - Professional */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {/* Card 1 */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-all">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="font-semibold text-white text-sm mb-1">Anonymous Voting</p>
            <p className="text-slate-400 text-xs leading-relaxed">No personal data required</p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-all">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="font-semibold text-white text-sm mb-1">Live Results</p>
            <p className="text-slate-400 text-xs leading-relaxed">Real-time opinion tracking</p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-all">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 14h8m-8-4h8M9 9h6M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </svg>
            </div>
            <p className="font-semibold text-white text-sm mb-1">Mobile Optimized</p>
            <p className="text-slate-400 text-xs leading-relaxed">Works on all devices</p>
          </div>
        </div>

        {/* Disclaimer - Professional */}
        <div className="bg-amber-950/40 border border-amber-900/50 rounded-lg p-5 mb-10">
          <div className="flex gap-4">
            <div className="w-5 h-5 bg-amber-600/30 rounded flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-amber-300 text-xs font-bold">!</span>
            </div>
            <div>
              <p className="font-semibold text-amber-100 text-sm mb-1">Disclaimer</p>
              <p className="text-amber-200/80 text-xs leading-relaxed">
                This is a public opinion survey, not an official voting system. Results reflect user sentiment only.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 sm:flex sm:gap-3 sm:space-y-0">
          {/* Primary Button */}
          <Button
            onClick={() => router.push("/explore")}
            className="w-full sm:flex-1 py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Start Voting
          </Button>

          {/* Secondary Button */}
          <button
            onClick={() => router.push("/explore")}
            className="w-full sm:flex-1 py-3.5 text-base font-bold rounded-lg border-2 border-slate-700 hover:border-slate-600 text-white hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Find Your District
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-slate-300 font-medium">Encrypted & Secure</p>
          </div>
        </div>
      </div>
    </section>
  );
}