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
      {/* Vote Progress Bar */}
      {totalVotes > 0 && (
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${supportPercentage}%` }}
          />
        </div>
      )}

      {/* Vote Buttons */}
      <div className="flex gap-2.5">
        <button
          onClick={() => vote("support")}
          disabled={disabled}
          className={`flex-1 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-1.5 ${
            disabled
              ? "bg-slate-700 text-slate-500 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg active:scale-95"
          }`}
          title={disabled ? "Vote already cast" : "Vote support"}
        >
          <span className="text-base">+</span>
          <span>{support}</span>
        </button>

        <button
          onClick={() => vote("oppose")}
          disabled={disabled}
          className={`flex-1 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-1.5 ${
            disabled
              ? "bg-slate-700 text-slate-500 cursor-not-allowed"
              : "bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg active:scale-95"
          }`}
          title={disabled ? "Vote already cast" : "Vote oppose"}
        >
          <span className="text-base">-</span>
          <span>{oppose}</span>
        </button>
      </div>

      {/* Voted Badge */}
      {disabled && (
        <div className="text-center py-2 px-3 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-xs sm:text-sm font-bold text-blue-400">Vote recorded</p>
        </div>
      )}
    </div>
  );
}
