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

        {/* Mahabhidanta Chhetras card (replaces feature cards) */}
        <div className="mb-8">
          <div className="border-2 border-teal-100 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-md bg-teal-50 flex items-center justify-center text-teal-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v13h20V7L12 2zm0 2.18L19.6 8 12 11.82 4.4 8 12 4.18zM6 10v9h4v-6h4v6h4v-9L12 14 6 10z" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">MahaBhidanta Chhetras</h3>
                <p className="text-sm text-gray-600 mt-3 max-w-2xl">
                  This platform features the most popular constituencies across Nepal. The candidates and districts listed above represent key electoral regions.
                </p>

                <p className="text-sm text-gray-600 mt-3">
                  Don't see your candidates or constituency? We're continuously adding more regions. Contact us to request your constituency.
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => router.push("/contact")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V5z" />
                    </svg>
                    Contact Us to Add Yours
                  </button>
                </div>
              </div>
            </div>
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

        {/* CTA Buttons - three actions */}
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
            Explore
          </button>

          <button
            onClick={() => router.push("/contact")}
            className="w-full sm:flex-1 py-3.5 text-base font-semibold rounded-lg bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 transition"
          >
            Contact Us to Add Yours
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