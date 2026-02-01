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

  return (
    <div className="flex gap-3 mt-3">
      <button
        onClick={() => vote("support")}
        disabled={disabled}
        className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 active:scale-95 transition shadow-md text-white py-3 rounded-xl font-semibold ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        ☑ Support ({support})
      </button>

      <button
        onClick={() => vote("oppose")}
        disabled={disabled}
        className={`flex-1 bg-gradient-to-r from-red-500 to-red-600 active:scale-95 transition shadow-md text-white py-3 rounded-xl font-semibold ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        ⛔ Don’t ({oppose})
      </button>
    </div>
  );
}
