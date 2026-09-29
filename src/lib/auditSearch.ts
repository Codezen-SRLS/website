// Client-side search over the audit list shown on the portfolio page.

export interface Searchable {
  title?: string;
  tags?: string[];
  partner?: string;
  description?: string;
  extendedDescription?: string;
}

// Lowercase and strip accents so "cosmwasm" matches "CosmWasm" and "e" matches "é"
export const normalize = (text: unknown) =>
  (text || "")
    .toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "");

const tokenize = (query: string) => normalize(query).split(/\s+/).filter(Boolean);

// Where a word is found decides how strongly it counts toward the ranking
const FIELD_WEIGHTS: [keyof Searchable, number][] = [
  ["title", 4],
  ["tags", 3],
  ["partner", 2],
  ["description", 2],
  ["extendedDescription", 1],
];

const fieldText = (audit: Searchable, field: keyof Searchable) => {
  const value = audit[field];
  return normalize(Array.isArray(value) ? value.join(" ") : value);
};

// Returns the audits matching every word of the query, best matches first.
// An empty query returns the list unchanged.
export const searchAudits = <T extends Searchable>(audits: T[], query: string): T[] => {
  const words = tokenize(query);
  if (!words.length) return audits;

  return audits
    .map((audit, index) => {
      let score = 0;
      for (const word of words) {
        const weights = FIELD_WEIGHTS.filter(([field]) => fieldText(audit, field).includes(word)).map(([, w]) => w);
        if (!weights.length) return null;
        score += Math.max(...weights);
      }
      return { audit, score, index };
    })
    .filter((r): r is { audit: T; score: number; index: number } => r !== null)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((r) => r.audit);
};
