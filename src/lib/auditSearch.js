// Client-side search over the audit list shown on the portfolio page.

// Lowercase and strip accents so "cosmwasm" matches "CosmWasm" and "e" matches "é"
export const normalize = (text) =>
  (text || "")
    .toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "");

const tokenize = (query) => normalize(query).split(/\s+/).filter(Boolean);

// Where a word is found decides how strongly it counts toward the ranking
const FIELD_WEIGHTS = [
  ["title", 4],
  ["tags", 3],
  ["partner", 2],
  ["description", 2],
  ["extendedDescription", 1],
];

const fieldText = (audit, field) =>
  normalize(Array.isArray(audit[field]) ? audit[field].join(" ") : audit[field]);

// Returns the audits matching every word of the query, best matches first.
// An empty query returns the list unchanged.
export const searchAudits = (audits, query) => {
  const words = tokenize(query);
  if (!words.length) return audits;

  return audits
    .map((audit, index) => {
      let score = 0;
      for (const word of words) {
        const weights = FIELD_WEIGHTS.filter(([field]) => fieldText(audit, field).includes(word)).map(
          ([, weight]) => weight
        );
        if (!weights.length) return null;
        score += Math.max(...weights);
      }
      return { audit, score, index };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((r) => r.audit);
};
