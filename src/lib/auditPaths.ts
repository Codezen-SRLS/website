// Audit page URLs, ported unchanged from the Gatsby site's gatsby-node.js so every
// /audits/<slug>/ URL stays the same.

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
  image?: string;
  featured?: boolean;
  issues?: Issues;
  tvlUsd?: number;
  slug?: string;
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Report file names usually start with the publication date, e.g. "2025-10-17 Audit Report ..."
export const reportDate = (url?: string): string | null => {
  const match = decodeURIComponent(url || "").match(/(20\d\d)[-_.](\d\d)[-_.](\d\d)/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
};

// Page paths for every audit (by index), resolved together so collisions can be handled:
// 1. an explicit `slug` in audit-history.json always wins;
// 2. otherwise the slugified title;
// 3. titles that collide get their report date appended (stable, unlike "-2");
// 4. anything still ambiguous fails the build instead of overwriting a page.
export const resolveAuditPaths = (audits: RawAudit[]): string[] => {
  const base = audits.map((a) => (a.slug ? slugify(a.slug) : slugify(a.title)));

  const groups = new Map<string, number[]>();
  base.forEach((key, i) => groups.set(key, [...(groups.get(key) || []), i]));

  const paths: string[] = new Array(audits.length);
  const conflicts: string[] = [];
  groups.forEach((group, key) => {
    if (group.length === 1) {
      paths[group[0]] = `/audits/${key}/`;
      return;
    }
    const dates = group.map((i) => reportDate(audits[i].github));
    const canUseDates =
      group.every((i) => !audits[i].slug) && dates.every(Boolean) && new Set(dates).size === dates.length;
    if (!canUseDates) {
      conflicts.push(`"${key}": ${group.map((i) => audits[i].title).join(", ")}`);
      return;
    }
    group.forEach((i, j) => (paths[i] = `/audits/${key}-${dates[j]}/`));
  });

  if (conflicts.length) {
    throw new Error(
      `Audit page URLs collide. Add a unique "slug" to these entries in audit-history.json:\n  ${conflicts.join("\n  ")}`
    );
  }
  return paths;
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
