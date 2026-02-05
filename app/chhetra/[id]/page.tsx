"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Candidate, Chhetra } from "@/types/candidate";
import CandidateCard from "@/components/candidate/CandidateCard";
import Button from "@/components/ui/button";

type Props = {
  params: { id: string };
};

export default function ChhetraPage({ params }: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [chhetraName, setChhetraName] = useState<string>("");
  const [chhetraRegion, setChhetraRegion] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParty, setSelectedParty] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let candidatesData: Candidate[] = [];
        let chhetraData: Chhetra | undefined;

        try {
          const [cData, chData] = await Promise.all([
            apiFetch<Candidate[]>(`/chhetra/${params.id}/candidates`),
            apiFetch<Chhetra>(`/chhetras/${params.id}`),
          ]);
          candidatesData = cData || [];
          chhetraData = chData;
        } catch (err) {
          // Fallback: fetch from chhetras list
          const chhetras = await apiFetch<Chhetra[]>(`/chhetras/`);
          chhetraData = chhetras?.find((c: any) => c.id === Number(params.id));
          candidatesData = await apiFetch<Candidate[]>(`/chhetra/${params.id}/candidates`) || [];
        }

        setCandidates(candidatesData || []);
        if (chhetraData) {
          setChhetraName(chhetraData.name || "Unknown Chhetra");
          setChhetraRegion(chhetraData.region || "Unknown Region");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    if (selectedParty !== "all" && c.party !== selectedParty) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.party.toLowerCase().includes(q);
  });

  const uniqueParties = Array.from(new Set(candidates.map((c) => c.party)));

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <button
            onClick={() => router.push("/explore")}
            className="text-blue-400 hover:text-blue-300 text-sm font-bold mb-3 flex items-center gap-1 transition"
          >
            ← Back to Explore
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {chhetraName}
            </h1>
            <p className="text-slate-400 mt-1 font-semibold">
              {chhetraRegion} • {candidates.length} candidate{candidates.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Loading State */}
        {loading && (
          <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700">
            <div className="inline-block animate-spin mb-3 text-3xl">...</div>
            <p className="text-slate-300 font-semibold">Loading candidates...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-900/30 border border-rose-700 rounded-2xl p-6 text-center">
            <p className="text-rose-300 font-bold text-lg">Error</p>
            <p className="text-rose-200 mt-2 font-semibold">{error}</p>
          </div>
        )}

        {/* Filter Bar */}
        {!loading && !error && candidates.length > 0 && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-sm p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-slate-200 placeholder-slate-500 font-semibold focus:border-blue-500 focus:outline-none transition hover:border-slate-600"
                />
              </div>

              {/* Party Filter */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">
                  Party
                </label>
                <select
                  value={selectedParty}
                  onChange={(e) => setSelectedParty(e.target.value)}
                  className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-slate-200 font-semibold focus:border-blue-500 focus:outline-none transition hover:border-slate-600"
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

            {/* Clear Filters */}
            {(searchQuery.trim() || selectedParty !== "all") && (
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedParty("all");
                }}
                variant="outline"
                className="w-full text-slate-200 border-slate-600 hover:bg-slate-700"
              >
                × Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && candidates.length === 0 && (
          <div className="bg-amber-900/30 border border-amber-700 rounded-2xl p-8 text-center">
            <p className="text-amber-300 text-lg font-bold">No candidates found in this constituency</p>
            <p className="text-amber-200 text-sm mt-2 font-semibold">Please try another constituency</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && candidates.length > 0 && filteredCandidates.length === 0 && (
          <div className="bg-blue-900/30 border border-blue-700 rounded-2xl p-8 text-center">
            <p className="text-blue-300 text-lg font-bold">No candidates match your filters</p>
            <p className="text-blue-200 text-sm mt-2 font-semibold">Try adjusting your search or party filter</p>
          </div>
        )}

        {/* Candidate Cards */}
        {!loading && !error && filteredCandidates.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  showChhetra={false}
                  showVoteActions={true}
                />
              ))}
            </div>

            {/* Results Summary */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 sm:p-6 text-center">
              <p className="text-slate-300 font-semibold">
                Showing <span className="font-black text-blue-400">{filteredCandidates.length}</span> of{" "}
                <span className="font-black text-blue-400">{candidates.length}</span> candidates
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {!loading && !error && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push("/explore")}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              Explore All Constituencies
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="flex-1 border border-slate-700 text-slate-200 hover:bg-slate-700 font-bold py-3 rounded-lg transition"
            >
              Home
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
