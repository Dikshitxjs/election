"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { useFingerprint } from "@/lib/fingerprint";

export default function VoteActions({ candidateId, initialSupport, initialOppose }: any) {
  const [support, setSupport] = useState<number>(initialSupport ?? 0);
  const [oppose, setOppose] = useState<number>(initialOppose ?? 0);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { getFingerprint } = useFingerprint();

  // Disable voting locally if we've already voted for this candidate
  useEffect(() => {
    try {
      const v = localStorage.getItem(`voted:${candidateId}`);
      if (v) setDisabled(true);
    } catch (e) {}
  }, [candidateId]);

  const vote = async (type: "support" | "oppose") => {
    if (loading || disabled) return;
    setLoading(true);

    if (type === "support") setSupport((v: number) => v + 1);
    else setOppose((v: number) => v + 1);

    try {
      const fingerprint = await getFingerprint().catch(() => undefined);
      const payload: any = { candidateId, voteType: type };
      if (fingerprint) payload.fingerprint = fingerprint;

      const res = await apiFetch("/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSupport(res.supportCount);
      setOppose(res.opposeCount);

      // Mark locally that this fingerprint voted for this candidate to prevent repeated clicks
      try {
        localStorage.setItem(`voted:${candidateId}`, JSON.stringify({ type }));
        setDisabled(true);
      } catch (e) {}
    } catch (err) {
      if (type === "support") setSupport((v: number) => v - 1);
      else setOppose((v: number) => v - 1);
    } finally {
      setLoading(false);
    }
  };

  const totalVotes = support + oppose;
  const supportPercentage = totalVotes > 0 ? Math.round((support / totalVotes) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* Vote Progress Bar - two tone (support / oppose) on a light track */}
      {totalVotes > 0 && (
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div className="flex w-full h-full">
            <div
              className="h-full transition-all duration-300 bg-emerald-600"
              style={{ width: `${supportPercentage}%` }}
              aria-hidden
            />
            <div
              className="h-full transition-all duration-300 bg-rose-500"
              style={{ width: `${100 - supportPercentage}%` }}
              aria-hidden
            />
          </div>
        </div>
      )}

      {/* Vote Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => vote("support")}
          disabled={disabled || loading}
          aria-label="Vote for this candidate"
          className={`flex-1 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2 border ${
            disabled
              ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
              : "bg-white text-gray-800 border-gray-300 hover:shadow-sm"
          }`}
          title={disabled ? "Vote already recorded" : "Vote for this candidate"}
        >
          {/* Nepali swastik SVG icon (religious symbol) - styled as icon */}
          <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-700">
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9h4v2H6v4H3V9z" />
              <path d="M9 3h2v4h4v2h-4v4H9V3z" />
              <path d="M21 15h-4v-2h1v-3h-3v5h-2v4h8v-4z" />
            </g>
          </svg>
          <span className="flex-1 text-left">
            <span className="block text-sm font-bold">Vote</span>
            <span className="block text-xs text-gray-500">{support} votes</span>
          </span>
        </button>

        <button
          onClick={() => vote("oppose")}
          disabled={disabled || loading}
          aria-label="Don't vote / oppose"
          className={`flex-1 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2 ${
            disabled
              ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
              : "bg-white text-gray-800 border border-red-100 hover:bg-red-50"
          }`}
          title={disabled ? "Vote already recorded" : "Don't vote / Oppose"}
        >
          <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="flex-1 text-left">
            <span className="block text-sm font-bold">Don't Vote</span>
            <span className="block text-xs text-gray-500">{oppose} votes</span>
          </span>
        </button>
      </div>

      {/* Voted Badge */}
      {disabled && (
        <div className="text-center py-2 px-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <p className="text-xs sm:text-sm font-bold text-emerald-700">Your vote has been recorded</p>
        </div>
      )}
    </div>
  );
}
