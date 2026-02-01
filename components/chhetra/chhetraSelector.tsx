"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ChhetraSelector({
  selectedChhetraId,
  onSelectChhetra,
}: {
  selectedChhetraId?: string;
  onSelectChhetra: (id: string) => void;
}) {
  const [chhetras, setChhetras] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiFetch("/chhetras").then(setChhetras);
  }, []);

  const filtered = chhetras.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-bold text-lg">Select Your Chhetra</h2>
      </div>

      <div className="p-4">
        <input
          placeholder="Search Chhetra..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {filtered.map((c) => {
          const isSelected = selectedChhetraId === c.id.toString();
          return (
            <button
              key={c.id}
              onClick={() => onSelectChhetra(c.id.toString())}
              className={`w-full text-left p-4 rounded-xl border ${isSelected ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 hover:bg-blue-50'}`}
            >
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-500">Chhetra {c.id}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
