"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="min-h-screen px-4 py-12 flex items-center justify-center bg-white">
      <div className="relative z-10 w-full max-w-3xl">
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Public Opinion Poll • Nepal 2081</p>
          </div>
        </div>

        {/* Main Heading - Professional */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 leading-tight">
            Nepal Election 2081
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-normal">
            Discover candidates in your region and see public opinion at a glance.
          </p>
        </div>

        {/* Feature Cards - simplified */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2z M4 6v12a2 2 0 002 2h12" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">Anonymous</p>
            <p className="text-gray-500 text-xs leading-relaxed">No personal data required</p>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 10 4-18 3 8h4" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">Live Results</p>
            <p className="text-gray-500 text-xs leading-relaxed">Real-time public opinion</p>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">Mobile First</p>
            <p className="text-gray-500 text-xs leading-relaxed">Designed for phones and tablets</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-teal-100 rounded flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-teal-600 text-xs font-bold">!</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm mb-1">Disclaimer</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                This is a public opinion survey, not an official voting system. Results reflect user sentiment only.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 sm:flex sm:gap-3 sm:space-y-0">
          <Button
            onClick={() => router.push("/explore")}
            className="w-full sm:flex-1 py-3.5 text-base font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
          >
            Start Voting
          </Button>

          <button
            onClick={() => router.push("/explore")}
            className="w-full sm:flex-1 py-3.5 text-base font-semibold rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Find Your District
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100">
            <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-gray-600 font-medium">Encrypted & Secure</p>
          </div>
        </div>
      </div>
    </section>
  );
}