"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import CandidateCard from "@/components/candidate/CandidateCard";
import ChhetraFilter from "@/components/chhetra/ChhetraFilter";
import ChhetraSelector from "@/components/chhetra/chhetraSelector";
import SearchBar from "@/components/ui/SearchBar";
import Button from "@/components/ui/button";
import { useFingerprint } from "@/lib/fingerprint";
import { apiFetch } from "@/lib/api";
import { Candidate, Chhetra } from "@/types/candidate";

export default function ExplorePage() {
  const _router = useRouter();
  const { getFingerprint } = useFingerprint();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [chhetras, setChhetras] = useState<Chhetra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChhetra, setSelectedChhetra] = useState<number | "all">("all");
  const [selectedParty, setSelectedParty] = useState<string>("all");
  const [showChhetraSelector, setShowChhetraSelector] = useState(false);

  // ---------------- Fetch data ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [candidatesData, chhetrasData] = await Promise.all([
          apiFetch<Candidate[]>("/candidates/"),
          apiFetch<Chhetra[]>("/chhetras/"),
        ]);
        setCandidates(candidatesData);
        setChhetras(chhetrasData);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ---------------- Fingerprint ----------------
  useEffect(() => {
    getFingerprint().catch(() => {});
  }, [getFingerprint]);

  // ---------------- Filtering ----------------
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (
        selectedChhetra !== "all" &&
        c.chhetra_id !== selectedChhetra
      )
        return false;

      if (selectedParty !== "all" && c.party !== selectedParty) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.party.toLowerCase().includes(q) ||
        c.bio?.toLowerCase().includes(q)
      );
    });
  }, [candidates, selectedChhetra, selectedParty, searchQuery]);

  // ---------------- Group by chhetra (FIXED) ----------------
  const grouped = useMemo(() => {
    const map: Record<number, { chhetra: Chhetra; candidates: Candidate[] }> =
      {};

    chhetras.forEach((ch) => {
      map[ch.id] = { chhetra: ch, candidates: [] };
    });

    filteredCandidates.forEach((c) => {
      const chhetraId = c.chhetra_id || c.chhetraId;
      if (chhetraId && map[chhetraId]) {
        map[chhetraId].candidates.push(c);
      }
    });

    return Object.values(map).filter((g) => g.candidates.length > 0);
  }, [chhetras, filteredCandidates]);

  const uniqueParties = useMemo(
    () => Array.from(new Set(candidates.map((c) => c.party))),
    [candidates]
  );

  const clearAllFilters = () => {
    setSelectedChhetra("all");
    setSelectedParty("all");
    setSearchQuery("");
  };

  // Get total votes for display
  const totalVotes = candidates.reduce((sum, c) => sum + (c.supportCount || 0) + (c.opposeCount || 0), 0);

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Candidates</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Browse all candidates and cast your vote</p>
        </div>
      </header>

      {/* Chhetra Selector Modal - Improved UX */}
      {showChhetraSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in">
          <div className="bg-white w-full md:max-w-lg rounded-t-2xl md:rounded-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Select Constituency</h2>
              <button
                onClick={() => setShowChhetraSelector(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 font-bold text-xl w-8 h-8 flex items-center justify-center"
                title="Close"
              >
                ×
              </button>
            </div>
            <ChhetraSelector
              selectedChhetraId={
                selectedChhetra !== "all" ? Number(selectedChhetra) : undefined
              }
              onSelectChhetra={(id: number) => {
                setSelectedChhetra(id);
                setShowChhetraSelector(false);
              }}
            />
          </div>
        </div>
      )}

      <main className="px-4 sm:px-6 py-4 sm:py-6 max-w-6xl mx-auto pb-24">
        {/* Search Bar  */}
        <div className="mb-4 sm:mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search candidates..."
          />
        </div>

        {/* Filters  */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 mb-4 sm:mb-6 shadow-sm">
          <div className="space-y-3 sm:space-y-4">
            {/*  Button */}
            <button
              onClick={() => setShowChhetraSelector(true)}
              className="w-full bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.2" />
              </svg>
              Find Your Chhetra
            </button>

            {/* Filters Grid  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Chhetra Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Chhetra
                </label>
                <select
                  value={selectedChhetra === "all" ? "all" : selectedChhetra.toString()}
                  onChange={(e) => setSelectedChhetra(e.target.value === "all" ? "all" : Number(e.target.value))}
                  className="w-full p-2.5 border-2 border-gray-300 rounded-lg bg-white text-sm font-semibold text-slate-900 focus:border-teal-500 focus:outline-none transition"
                >
                  <option value="all">All ({chhetras.length})</option>
                  {chhetras.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Party Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Party
                </label>
                <select
                  value={selectedParty}
                  onChange={(e) => setSelectedParty(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-300 rounded-lg bg-white text-sm font-semibold text-slate-900 focus:border-teal-500 focus:outline-none transition"
                >
                  <option value="all">All ({uniqueParties.length})</option>
                  {uniqueParties.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters  */}
            {(selectedChhetra !== "all" || selectedParty !== "all" || searchQuery.trim()) && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2.5 px-4 border-2 border-red-300 hover:bg-red-50 text-red-600 font-semibold rounded-lg transition text-sm sm:text-base"
              >
                ✕ Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <StatCard label="Candidates" value={filteredCandidates.length} />
            <StatCard label="Constituencies" value={new Set(filteredCandidates.map((c) => c.chhetra_id || c.chhetraId).filter(Boolean)).size} />
            <StatCard label="Parties" value={uniqueParties.length} />
            <StatCard label="Votes" value={totalVotes} />
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="bg-white rounded-lg p-8 sm:p-12 text-center border border-gray-200 shadow-sm">
            <div className="inline-block animate-spin text-3xl mb-3">⏳</div>
            <p className="text-gray-600 font-medium">Loading candidates...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-semibold text-lg">Error Loading</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        ) : grouped.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 text-center">
            <p className="text-slate-900 font-semibold text-lg">No candidates found</p>
            <p className="text-gray-600 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {grouped.map((g) => (
              <section
                key={g.chhetra.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* District Header */}
                <div className="bg-gray-50 px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg sm:text-xl text-slate-900">
                    {g.chhetra.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                    {g.candidates.length} candidate{g.candidates.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Candidates Grid */}
                <div className="p-3 sm:p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {g.candidates.map((c) => (
                      <CandidateCard
                        key={c.id}
                        candidate={c}
                        showChhetra={false}
                        showVoteActions
                      />
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-gray-200 text-center shadow-sm">
      <div className="text-lg sm:text-2xl font-bold text-teal-600">{value}</div>
      <div className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">{label}</div>
    </div>
  );
}
