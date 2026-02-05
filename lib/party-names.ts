// Party short name to full name mapping
export const PARTY_MAP: Record<string, string> = {
  "UML": "CPN (UML)",
  "Congress": "Nepali Congress",
  "RSP": "Rastriya Swatantra Party",
  "Maoist": "CPN (Maoist Centre)",
  "PLP": "Pragatisheel Loktantrik Party",
  "RPP": "Rastriya Prajatantra Party",
  "IND": "Independent",
  "ULP": "Unified Left Party",
};

/**
 * Get full party name from short name.
 * If already full name or not found, return as-is.
 */
export function getPartyFullName(partyShort: string): string {
  return PARTY_MAP[partyShort] || partyShort;
}
