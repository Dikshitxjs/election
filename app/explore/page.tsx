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
  const router = useRouter();
  const { getFingerprint } = useFingerprint();

  // ----- State -----
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [chhetras, setChhetras] = useState<Chhetra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChhetra, setSelectedChhetra] = useState<string>("all");
  const [selectedParty, setSelectedParty] = useState<string>("all");
  const [showChhetraSelector, setShowChhetraSelector] = useState(false);

  // ----- Fetch Data -----
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ----- Fingerprint -----
  useEffect(() => {
    (async () => {
      try {
        const visitorId = await getFingerprint();
        console.log("Visitor ID:", visitorId);
      } catch (err) {
        console.error("Fingerprint error:", err);
      }
    })();
  }, [getFingerprint]);

  // ----- Filtered Candidates -----
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (selectedChhetra !== "all" && c.chhetraId !== parseInt(selectedChhetra)) return false;
      if (selectedParty !== "all" && c.party !== selectedParty) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.party.toLowerCase().includes(q) ||
        (c.bio?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [candidates, selectedChhetra, selectedParty, searchQuery]);

  const uniqueParties = useMemo(() => Array.from(new Set(candidates.map((c) => c.party))), [candidates]);

  const clearAllFilters = () => {
    setSelectedChhetra("all");
    setSelectedParty("all");
    setSearchQuery("");
  };

  // ----- Group candidates by chhetra for sectioned UI -----
  const grouped = chhetras.reduce(
    (acc: Record<string, { chhetra: Chhetra; candidates: Candidate[] }>, ch: Chhetra) => {
      acc[ch.id] = { chhetra: ch, candidates: [] };
      return acc;
    },
    {} as Record<string, { chhetra: Chhetra; candidates: Candidate[] }>
  );

  candidates.forEach((c) => {
    const k = c.chhetraId || 0;
    if (!grouped[k]) grouped[k] = { chhetra: { id: k, name: `Chhetra ${k}`, region: "" }, candidates: [] };
    grouped[k].candidates.push(c);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Explore Candidates</h1>
            <p className="text-gray-800 mt-1">Browse and vote for candidates from all election regions</p>
          </div>
          <Button
            onClick={() => setShowChhetraSelector((prev) => !prev)}
            variant="outline"
            className="w-full md:w-auto flex items-center gap-2 text-black"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Find Your Chhetra
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Chhetra Selector Modal */}
        {showChhetraSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-black">Find Your Chhetra</h2>
                  <button onClick={() => setShowChhetraSelector(false)} className="text-gray-600 hover:text-gray-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ChhetraSelector
                  selectedChhetraId={selectedChhetra !== "all" ? selectedChhetra : undefined}
                  onSelectChhetra={(id) => {
                    setSelectedChhetra(id);
                    setShowChhetraSelector(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Search Candidates</label>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by name, party..." />
          </div>

          <div>
            <ChhetraFilter
              chhetras={chhetras}
              selectedChhetra={selectedChhetra}
              onChhetraChange={setSelectedChhetra}
              showAllOption
              label="Filter by Region"
              className="text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Filter by Party</label>
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
            >
              <option value="all">All Parties</option>
              {uniqueParties.map((party) => (
                <option key={party} value={party}>{party}</option>
              ))}
            </select>
            {selectedParty !== "all" && (
              <div className="mt-2 flex justify-between items-center">
                <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{selectedParty}</span>
                <button onClick={() => setSelectedParty("all")} className="text-sm text-gray-500 hover:text-gray-700">Clear</button>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedChhetra !== "all" || selectedParty !== "all" || searchQuery) && (
          <div className="flex items-center justify-between text-sm text-gray-800">
            <div className="flex flex-wrap gap-2">
              {selectedChhetra !== "all" && (
                <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {chhetras.find((c) => c.id === parseInt(selectedChhetra))?.name || ""}
                </span>
              )}
              {selectedParty !== "all" && (
                <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{selectedParty}</span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Search: "{searchQuery}"</span>
              )}
            </div>
            <button onClick={clearAllFilters} className="text-red-600 hover:text-red-800">Clear all</button>
          </div>
        )}

        {/* Candidate Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-800">Loading candidates...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 font-medium">{error}</p>
            <Button onClick={() => window.location.reload()} variant="primary" className="mt-4 bg-red-600 hover:bg-red-700">
              Try Again
            </Button>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Candidates Found</h3>
            <p className="text-gray-800 mb-6">Try adjusting your filters or search terms</p>
            <Button onClick={clearAllFilters} variant="primary">Clear All Filters</Button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.values(grouped).map((g) => (
              <section key={g.chhetra.id} className="bg-white rounded-xl p-4 border">
                <h2 className="font-semibold text-lg mb-4 text-black">{g.chhetra.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {g.candidates
                    .filter((c) => filteredCandidates.some((fc) => fc.id === c.id))
                    .map((candidate) => (
                      <CandidateCard key={candidate.id} candidate={candidate} showChhetra showVoteActions />
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && !error && filteredCandidates.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Candidates" value={filteredCandidates.length} />
            <StatCard label="Chhetras" value={Array.from(new Set(filteredCandidates.map((c) => c.chhetraId))).length} />
            <StatCard label="Support Votes" value={filteredCandidates.reduce((sum, c) => sum + c.supportCount, 0)} />
            <StatCard label="Total Comments" value={filteredCandidates.reduce((sum, c) => sum + (c.commentsCount || 0), 0)} />
          </div>
        )}
      </main>
    </div>
  );
}

// ----- Helper -----
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
      <div className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-800">{label}</div>
    </div>
  );
}
