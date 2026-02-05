"use client";

import { useState, useEffect, useRef } from "react";
import { Chhetra } from "@/types/candidate";

interface ChhetraFilterProps {
  chhetras: Chhetra[];
  selectedChhetra: number | "all";
  onChhetraChange: (chhetraId: number | "all") => void;
  showAllOption?: boolean;
  label?: string;
}

export default function ChhetraFilter({
  chhetras,
  selectedChhetra,
  onChhetraChange,
  showAllOption = true,
  label = "📍 Filter by Chhetra",
}: ChhetraFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedChhetraName =
    selectedChhetra === "all"
      ? "All Chhetras"
      : chhetras.find((c) => c.id === selectedChhetra)?.name ?? `Chhetra ${selectedChhetra}`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (value: number | "all") => {
    onChhetraChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>

      {/* Desktop Select */}
      <select
        value={selectedChhetra === "all" ? "all" : selectedChhetra.toString()}
        onChange={(e) => handleSelect(e.target.value === "all" ? "all" : Number(e.target.value))}
        className="hidden sm:block w-full p-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-medium focus:border-blue-500 focus:outline-none transition cursor-pointer hover:border-gray-300"
      >
        {showAllOption && <option value="all">All Chhetras ({chhetras.length})</option>}
        {chhetras.map((ch) => (
          <option key={ch.id} value={ch.id}>
            {ch.name} — {ch.region}
          </option>
        ))}
      </select>

      {/* Mobile Button with Dropdown */}
      <div className="block sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-medium hover:border-blue-300 transition flex items-center justify-between"
        >
          <span className="truncate">{selectedChhetraName}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl overflow-y-auto max-h-64">
            {showAllOption && (
              <button
                onClick={() => handleSelect("all")}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 transition ${
                  selectedChhetra === "all"
                    ? "bg-blue-100 text-blue-900 font-semibold"
                    : "hover:bg-gray-50 text-gray-900"
                }`}
              >
                <p className="font-semibold">All Chhetras ({chhetras.length})</p>
              </button>
            )}

            {chhetras.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleSelect(ch.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 transition ${
                  selectedChhetra === ch.id
                    ? "bg-blue-100 text-blue-900 font-semibold"
                    : "hover:bg-gray-50 text-gray-900"
                }`}
              >
                <p className="font-semibold">{ch.name}</p>
                <p className="text-xs text-gray-600">{ch.region}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
