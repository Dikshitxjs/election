export const PARTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  UML: { bg: "#fef3c7", text: "#92400e", border: "#fbbf24" },
  NC: { bg: "#dbeafe", text: "#1e40af", border: "#60a5fa" },
  RSP: { bg: "#fce7f3", text: "#be185d", border: "#f472b6" },
  CPN: { bg: "#fee2e2", text: "#991b1b", border: "#f87171" },
  UNP: { bg: "#fff7ed", text: "#c2410c", border: "#fb923c" },
  US: { bg: "#ecfdf5", text: "#065f46", border: "#34d399" },
  // Add more parties as needed
};

export const PARTY_ABBREVIATIONS: Record<string, string> = {
  UML: "UML",
  NC: "NC",
  RSP: "RSP",
  CPN: "CPN",
  US: "US",
  "Communist Party of Nepal": "CPN",
  "Nepali Congress": "NC",
  "Rastriya Swatantra Party": "RSP",
  "UJyalo Nepal Party": "UNP",
  "UJyalo Nepal Party (UNP)": "UNP",
  "Unified Socialist": "US",
};

export function getPartyColor(partyName: string) {
  // Try exact match first
  const exactMatch = PARTY_COLORS[partyName];
  if (exactMatch) return exactMatch;

  // Try to match by abbreviation or common names
  const normalizedParty = partyName.toUpperCase();
  for (const [key, colors] of Object.entries(PARTY_COLORS)) {
    if (normalizedParty.includes(key) || key.includes(normalizedParty)) {
      return colors;
    }
  }

  // Default color for unknown parties
  return {
    bg: "#f3f4f6",
    text: "#374151",
    border: "#d1d5db",
  };
}

export function getPartyAbbreviation(partyName: string): string {
  // Try exact match
  if (PARTY_ABBREVIATIONS[partyName]) {
    return PARTY_ABBREVIATIONS[partyName];
  }

  // Try to find by key
  const normalizedParty = partyName.toLowerCase();
  for (const [key, abbreviation] of Object.entries(PARTY_ABBREVIATIONS)) {
    if (normalizedParty.includes(key.toLowerCase()) || 
        key.toLowerCase().includes(normalizedParty)) {
      return abbreviation;
    }
  }

  // Return first 3 letters if no match
  return partyName.substring(0, 3).toUpperCase();
}