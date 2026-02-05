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
    return <div className="p-4 text-center text-gray-500">Loading chhetras...</div>;
  }

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto">
      {/* 📍 Search Input */}
      <div className="sticky top-0 bg-white z-10 mb-4">
        <input
          autoFocus
          placeholder="🔍 Search chhetra by name or region..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition bg-gray-50"
        />
        <p className="text-xs text-gray-600 mt-2 px-3">
          Total: {filtered.length} chhetra{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* 📍 Chhetra List */}
      {filtered.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p className="text-sm">No chhetras found matching "{search}"</p>
        </div>
      ) : (
        <div className="space-y-2 px-0">
          {filtered.map((c) => {
            const active = selectedChhetraId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  onSelectChhetra(c.id);
                }}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300 text-gray-900"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-base sm:text-lg ${active ? "text-white" : "text-gray-900"}`}>
                      📍 {c.name}
                    </p>
                    <p className={`text-sm mt-1 ${active ? "text-blue-100" : "text-gray-600"}`}>
                      {c.region} • {c.candidateCount || 0} candidate{(c.candidateCount || 0) !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {active && (
                    <div className="ml-2 text-white text-xl shrink-0">✓</div>
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
