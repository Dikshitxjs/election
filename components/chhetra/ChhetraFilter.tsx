"use client";

import { useState, useEffect, useRef } from "react";
import { Chhetra } from "@/types/candidate";

interface ChhetraFilterProps {
  chhetras: Chhetra[];
  selectedChhetra: string;
  onChhetraChange: (chhetraId: string) => void;
  showAllOption?: boolean;
  label?: string;
  className?: string;
}

export default function ChhetraFilter({
  chhetras,
  selectedChhetra,
  onChhetraChange,
  showAllOption = true,
  label = "Filter by Chhetra",
  className = "",
}: ChhetraFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listId = "chhetra-filter-list";

  const selectedChhetraName =
    selectedChhetra === "all"
      ? "All Chhetras"
      : chhetras.find((c) => c.id === Number(selectedChhetra))?.name ??
        `Chhetra ${selectedChhetra}`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (value: string) => {
    onChhetraChange(value);
    setIsOpen(false);
  };

  const openAndInit = () => {
    setIsOpen(true);
    const idx = chhetras.findIndex((c) => c.id === Number(selectedChhetra));
    setHighlightedIndex(idx >= 0 ? idx : 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && ["ArrowDown", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openAndInit();
      return;
    }
    if (e.key === "Escape") setIsOpen(false);
    if (e.key === "ArrowDown")
      setHighlightedIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, chhetras.length - 1)));
    if (e.key === "ArrowUp")
      setHighlightedIndex((prev) => (prev === null ? chhetras.length - 1 : Math.max(prev - 1, 0)));
    if (e.key === "Enter" && highlightedIndex !== null) {
      handleSelect(chhetras[highlightedIndex].id.toString());
    }
  };

  return (
    <div className={`chhetra-filter ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>

      {/* Desktop Dropdown */}
      <div className="hidden md:block">
        <select
          value={selectedChhetra}
          onChange={(e) => onChhetraChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {showAllOption && <option value="all">All Chhetras</option>}
          {chhetras.map((c) => (
            <option key={c.id} value={c.id.toString()}>
              {c.name} — {c.region}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden relative">
        <button
          id={`${listId}-button`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-haspopup="listbox"
          onClick={() => (isOpen ? setIsOpen(false) : openAndInit())}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between text-gray-800"
        >
          <span className="truncate">{selectedChhetraName}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div
            id={listId}
            role="listbox"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          >
            {showAllOption && (
              <button
                role="option"
                aria-selected={selectedChhetra === "all"}
                onClick={() => handleSelect("all")}
                className={`w-full text-left px-4 py-3 hover:bg-blue-50 rounded-t-lg ${
                  selectedChhetra === "all" ? "bg-blue-50 text-blue-700" : ""
                }`}
              >
                All Chhetras
              </button>
            )}

            {chhetras.map((ch, idx) => {
              const isSelected = selectedChhetra === ch.id.toString();
              const isHighlighted = highlightedIndex === idx;
              return (
                <button
                  key={ch.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(ch.id.toString())}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-4 py-3 hover:bg-blue-50 border-t border-gray-100 ${
                    isSelected ? "bg-blue-50 text-blue-700" : ""
                  } ${isHighlighted ? "bg-gray-100" : ""}`}
                >
                  <div className="font-medium text-gray-900">{ch.name}</div>
                  <div className="text-sm text-gray-500">{ch.region} Region</div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedChhetra !== "all" && (
        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {selectedChhetraName}
          </div>
          <button onClick={() => onChhetraChange("all")} className="text-sm text-gray-500 hover:text-gray-700">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
