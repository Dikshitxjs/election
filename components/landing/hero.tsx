"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="min-h-screen px-4 py-12 flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-blue-800">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Top badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-all">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
            <p className="text-sm font-semibold text-white">Public Opinion Poll 2081</p>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Nepal<br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-blue-200 to-cyan-200">
              Election 2081
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-md mx-auto font-medium">
            Discover candidates in your chhetra and see what the public thinks
          </p>
        </div>

        {/* Cards container */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {/* Card 1: Anonymous */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:border-white/40 hover:bg-white/15 transition-all group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔒</div>
            <p className="font-semibold text-white text-sm">Anonymous Voting</p>
            <p className="text-blue-100 text-xs mt-1">No personal data required</p>
          </div>

          {/* Card 2: Real-time */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:border-white/40 hover:bg-white/15 transition-all group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
            <p className="font-semibold text-white text-sm">Live Results</p>
            <p className="text-blue-100 text-xs mt-1">Real-time opinion tracking</p>
          </div>

          {/* Card 3: Mobile */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:border-white/40 hover:bg-white/15 transition-all group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📱</div>
            <p className="font-semibold text-white text-sm">Mobile First</p>
            <p className="text-blue-100 text-xs mt-1">Works on all devices</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-2xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">⚠️</span>
            <div className="text-left">
              <p className="font-bold text-orange-100 text-sm mb-1">Not an Official System</p>
              <p className="text-orange-100/80 text-xs">
                This is a public opinion poll, not an official voting system. Results reflect user sentiment only.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 sm:flex sm:gap-3 sm:space-y-0">
          {/* Primary CTA */}
          <Button
            onClick={() => router.push("/explore")}
            className="w-full sm:flex-1 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-linear-to-r from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300 text-slate-900 hover:scale-105 active:scale-95"
          >
            🗳️ Start Voting Now
          </Button>

          {/* Secondary CTA */}
          <button
            onClick={() => router.push("/explore")}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-4 text-lg font-bold rounded-xl border-2 border-white/40 hover:border-white/60 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm group"
          >
            <svg 
              className="w-5 h-5 group-hover:rotate-12 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Find Your Chhetra
          </button>
        </div>

        {/* Footer security note */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/30">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <p className="text-sm text-green-100 font-medium">
              ✓ Secured & Anonymous
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}