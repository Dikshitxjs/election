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

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Explore Candidates
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Browse and vote for candidates in your chhetra
              </p>
            </div>

            <Button
              onClick={() => setShowChhetraSelector(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              📍 Find Your Chhetra
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile / Desktop Chhetra Selector Modal */}
      {showChhetraSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4 animate-in">
          <div className="bg-white w-full md:max-w-xl rounded-t-3xl md:rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Select Your Chhetra</h2>
              <button
                onClick={() => setShowChhetraSelector(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
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

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Search Candidates
              </label>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, party..."
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Chhetra Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 Chhetra
                </label>
                <select
                  value={selectedChhetra === "all" ? "all" : selectedChhetra.toString()}
                  onChange={(e) => setSelectedChhetra(e.target.value === "all" ? "all" : Number(e.target.value))}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-medium focus:border-blue-500 focus:outline-none transition"
                >
                  <option value="all">All Chhetras ({chhetras.length})</option>
                  {chhetras.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Party Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏛️ Party
                </label>
                <select
                  value={selectedParty}
                  onChange={(e) => setSelectedParty(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-medium focus:border-blue-500 focus:outline-none transition"
                >
                  <option value="all">All Parties ({uniqueParties.length})</option>
                  {uniqueParties.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(selectedChhetra !== "all" || selectedParty !== "all" || searchQuery.trim()) && (
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="w-full text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                ✕ Clear All Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Candidates" value={filteredCandidates.length} />
            <StatCard
              label="Chhetras"
              value={
                new Set(filteredCandidates.map((c) => c.chhetra_id || c.chhetraId).filter(Boolean)).size
              }
            />
            <StatCard label="Parties" value={uniqueParties.length} />
            <StatCard label="Total" value={candidates.length} />
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="inline-block animate-spin mb-3">⏳</div>
            <p className="text-gray-600">Loading candidates...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-700 font-semibold">❌ Error</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        ) : grouped.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
            <p className="text-yellow-800 text-lg font-semibold">No candidates found</p>
            <p className="text-yellow-700 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map((g) => (
              <section
                key={g.chhetra.id}
                className="bg-white rounded-2xl border shadow-sm overflow-hidden"
              >
                <div className="bg-linear-to-r from-blue-50 to-blue-100 px-4 sm:px-6 py-4 border-b">
                  <h2 className="font-bold text-lg sm:text-xl text-gray-900">
                    📍 {g.chhetra.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {g.candidates.length} candidate{g.candidates.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
    <div className="bg-white p-4 rounded-lg border text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
