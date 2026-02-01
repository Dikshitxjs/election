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

  // Resolve selected chhetra name safely
  const selectedChhetraName =
    selectedChhetra === "all"
      ? "All Chhetras"
      : chhetras.find((c) => c.id === Number(selectedChhetra))?.name ??
        `Chhetra ${selectedChhetra}`;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
    // set highlighted to currently selected index or first
    const idx = chhetras.findIndex((c) => c.id === Number(selectedChhetra));
    setHighlightedIndex(idx >= 0 ? idx : 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openAndInit();
      }
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev === null ? 0 : prev + 1;
        return Math.min(next, chhetras.length - 1);
      });
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev === null ? chhetras.length - 1 : prev - 1;
        return Math.max(0, next);
      });
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex !== null) {
        const ch = chhetras[highlightedIndex];
        if (ch) handleSelect(ch.id.toString());
      }
      return;
    }
  };

  return (
    <div className={`chhetra-filter ${className}`} ref={dropdownRef}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>

      {/* ================= Desktop Dropdown ================= */}
      <div className="hidden md:block">
        <select
          value={selectedChhetra}
          onChange={(e) => onChhetraChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {showAllOption && <option value="all">All Chhetras</option>}

          {chhetras.map((chhetra) => (
            <option key={chhetra.id} value={chhetra.id.toString()}>
              {chhetra.name} — {chhetra.region}
            </option>
          ))}
        </select>
      </div>

      {/* ================= Mobile Custom Dropdown ================= */}
      <div className="md:hidden relative">
        <button
          id={`${listId}-button`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-haspopup="listbox"
          onClick={() => (isOpen ? setIsOpen(false) : openAndInit())}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between"
        >
          <span className="truncate">{selectedChhetraName}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
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
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                  selectedChhetra === "all"
                    ? "bg-blue-50 text-blue-700"
                    : ""
                }`}
              >
                All Chhetras
              </button>
            )}

            {chhetras.map((chhetra, idx) => {
              const isSelected = selectedChhetra === chhetra.id.toString();
              const isHighlighted = highlightedIndex === idx;

              return (
                <button
                  key={chhetra.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(chhetra.id.toString())}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-4 py-3 border-t border-gray-100 hover:bg-gray-50 ${
                    isSelected ? "bg-blue-50 text-blue-700" : ""
                  } ${isHighlighted ? "bg-gray-100" : ""}`}
                >
                  <div className="font-medium">{chhetra.name}</div>
                  <div className="text-sm text-gray-500">
                    {chhetra.region} Region
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= Active Filter Badge ================= */}
      {selectedChhetra !== "all" && (
        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            {selectedChhetraName}
          </div>

          <button
            onClick={() => onChhetraChange("all")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
