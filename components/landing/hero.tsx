"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="px-4 pt-8 pb-6 text-center min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-7 border border-gray-100">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            Nepal Election <span className="text-blue-700">2081</span>
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <p className="text-sm font-medium text-blue-800">
              Public Opinion Poll
            </p>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-red-500 mt-0.5">⚠️</span>
            <p className="font-semibold text-red-700 text-sm">
              This is NOT an official voting system
            </p>
          </div>
          <p className="text-red-600 text-xs pl-6">
            It reflects public sentiment only.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <span className="text-gray-600">🔒</span>
            <span className="text-xs font-medium text-gray-700">Anonymous</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <span className="text-gray-600">📊</span>
            <span className="text-xs font-medium text-gray-700">Opinion-Based</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <span className="text-gray-600">📱</span>
            <span className="text-xs font-medium text-gray-700">Mobile</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={() => router.push("/explore")}
            className="w-full py-3 text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            Start Exploring Candidates
          </Button>
          
          {/* "Find Your Chhetra Number" Button with different color */}
          <button
            onClick={() => router.push("/explore")}
            className="w-full flex items-center justify-center gap-2 border-2 border-green-200 rounded-xl py-3 text-sm font-semibold text-green-800 hover:bg-green-50 hover:border-green-400 hover:text-green-900 transition-all duration-200 bg-green-50/80"
          >
            <svg 
              className="w-4 h-4" 
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
            Find Your Chhetra Number
          </button>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span className="text-green-500">✓</span>
            Your vote is anonymous and encrypted
          </p>
        </div>
      </div>
    </section>
  );
}