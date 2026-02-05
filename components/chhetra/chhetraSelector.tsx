"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Chhetra {
  id: number;
  name: string;
  region: string;
  candidateCount?: number;
}

interface Props {
  selectedChhetraId?: number;
  onSelectChhetra: (id: number) => void;
}

export default function ChhetraSelector({
  selectedChhetraId,
  onSelectChhetra,
}: Props) {
  const [chhetras, setChhetras] = useState<Chhetra[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChhetras = async () => {
      try {
        const data = await apiFetch<Chhetra[]>("/chhetras");
        setChhetras(data || []);
      } catch (error) {
        console.error("Error fetching chhetras:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChhetras();
  }, []);

  const filtered = chhetras.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="inline-block animate-spin text-2xl mb-2">...</div>
        <p className="text-slate-400 font-medium">Loading districts...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-4">
        <input
          autoFocus
          placeholder="Search by name or region..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 sm:p-3.5 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition bg-slate-800 text-slate-200 font-medium text-sm"
        />
        <p className="text-xs text-slate-500 mt-2 px-1 font-semibold">
          {filtered.length} district{filtered.length !== 1 ? "s" : ""} • {filtered.reduce((sum, c) => sum + (c.candidateCount || 0), 0)} candidates
        </p>
      </div>

      {/* Districts List */}
      {filtered.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-slate-700 rounded-lg">
          <p className="text-sm text-slate-400 font-medium">No districts match "{search}"</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {filtered.map((c) => {
            const active = selectedChhetraId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectChhetra(c.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-lg transition-all duration-200 border font-semibold ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                    : "bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-600 text-slate-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-base sm:text-lg ${active ? "text-white" : "text-slate-100"}`}>
                      {c.name}
                    </p>
                    <p className={`text-xs sm:text-sm mt-1.5 font-semibold ${active ? "text-blue-100" : "text-slate-500"}`}>
                      {c.region} • {c.candidateCount || 0} candidate{(c.candidateCount || 0) !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {active && (
                    <div className="shrink-0 text-white text-2xl font-black leading-none">✓</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
