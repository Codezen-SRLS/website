// Audit page URLs (/audits/<slug>/ from the permanent slug in audit-history.json),
// report dates and related audits.

export interface Issues {
  critical?: number;
  major?: number;
  minor?: number;
  informational?: number;
}

export interface RawAudit {
  title: string;
  description?: string;
  extendedDescription?: string;
  tags?: string[];
  partner?: string;
  github?: string;
  website?: string;
  /** Logo path relative to the audit-history repo root, e.g. "images/stellar.png" */
  image?: string;
  /** Publication date of the report (YYYY-MM-DD), when known */
  date?: string;
  featured?: boolean;
  issues?: Issues;
  tvlUsd?: number;
  /** Permanent URL slug: /audits/<slug>/ */
  slug?: string;
}

// Report file names usually start with the publication date, e.g. "2025-10-17 Audit Report ..."
export const reportDate = (url?: string): string | null => {
  const match = decodeURIComponent(url || "").match(/(20\d\d)[-_.](\d\d)[-_.](\d\d)/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
};

// Date shown for an audit and used as sitemap lastmod: the explicit `date`, else the
// one in the report's file name
export const auditDate = (a: RawAudit): string | null =>
  (a.date && /^\d{4}-\d{2}-\d{2}$/.test(a.date) ? a.date : null) ?? reportDate(a.github);

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Page path for every audit (by index): /audits/<slug>/. The slug is stored in
// audit-history.json and is permanent, so titles can change without moving pages.
// Anything missing, malformed or duplicated fails the build instead of guessing.
export const resolveAuditPaths = (audits: RawAudit[]): string[] => {
  const problems: string[] = [];
  const seen = new Map<string, string>();
  audits.forEach((a) => {
    if (!a.slug) problems.push(`"${a.title}" has no slug (run \`npm run slugs\` in src/sharedData/tools/counter)`);
    else if (!SLUG.test(a.slug)) problems.push(`"${a.title}" has a malformed slug "${a.slug}"`);
    else if (seen.has(a.slug)) problems.push(`slug "${a.slug}" is used by both "${seen.get(a.slug)}" and "${a.title}"`);
    else seen.set(a.slug, a.title);
  });
  if (problems.length) throw new Error(`Invalid audit slugs in audit-history.json:\n  ${problems.join("\n  ")}`);
  return audits.map((a) => `/audits/${a.slug}/`);
};

// Tags too generic to say two audits are related
const GENERIC_TAGS = new Set(["audit", "blockchain", "smart contract"]);

const tagSet = (a: RawAudit) =>
  new Set((a.tags || []).map((t) => t.toLowerCase()).filter((t) => !GENERIC_TAGS.has(t)));

// Up to `limit` other audits ranked by shared technology tags (indexes into `audits`)
export const relatedAudits = (audits: RawAudit[], index: number, limit = 3): number[] => {
  const own = tagSet(audits[index]);
  return audits
    .map((other, i) => ({ i, shared: i === index ? 0 : [...tagSet(other)].filter((t) => own.has(t)).length }))
    .filter((o) => o.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((o) => o.i);
};
