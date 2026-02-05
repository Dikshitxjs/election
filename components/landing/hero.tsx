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

        {/* Mahabhidanta Chhetras card - simplified grid */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-600 bg-teal-50 rounded-lg p-6 shadow-sm">
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-14 h-14 rounded-lg bg-white flex items-center justify-center text-teal-600 shadow-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3 4h5v2h-1l-1 10H7L6 8H5V6h5L12 2m0 2l-2 2h4l-2-2m0 6h6l1 8H5l1-8h6z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">MahaBhidanta Chhetras</h3>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  This platform features the <strong>most popular constituencies</strong> across Nepal. The candidates and regions listed represent key electoral areas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons - two main actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => router.push("/explore")}
            className="py-4 text-base font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            Start Voting
          </button>

          <button
            onClick={() => router.push("/explore")}
            className="py-4 text-base font-bold rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c5.33 4.55 8 8.48 8 11.8 0 4.98-3.8 8.2-8 8.2s-8-3.22-8-8.2c0-3.32 2.67-7.25 8-11.8m0 2c-3.35 3-5 6.2-5 9.8 0 3.35 2.57 5.2 5 5.2s5-1.85 5-5.2c0-3.6-1.65-6.8-5-9.8z" />
            </svg>
            Explore
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <div className="w-6 h-6 flex items-center justify-center shrink-0 text-blue-600 font-bold text-lg">ℹ</div>
            <div>
              <p className="font-semibold text-blue-900 text-sm mb-1">Disclaimer</p>
              <p className="text-blue-800 text-xs leading-relaxed">
                This is a public opinion survey, not an official voting system. Results reflect user sentiment only.
              </p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-300">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
            </svg>
            <p className="text-xs text-green-700 font-semibold">Encrypted & Secure</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-6 shadow-sm">
          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center text-orange-600 shadow-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Don't see your constituency?</strong> We're continuously expanding. Contact us to request your region.
              </p>

              <button
                onClick={() => router.push("/contact")}
                className="mt-4 py-2 px-4 text-sm font-semibold rounded-lg border-2 border-orange-600 text-orange-700 bg-white hover:bg-orange-50 transition flex items-center gap-2"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}