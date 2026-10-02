// When did each audit page last change? Worked out from successive versions of
// audit-history.json (its git history), newest first. Pure: the git I/O lives in
// sitemapDates.ts.
import type { RawAudit } from "./auditPaths";

export interface DataVersion {
  /** Commit date (ISO 8601) */
  date: string;
  audits: RawAudit[];
}

// Fields that change what an audit page shows. `slug` is excluded (it's the identity,
// and adding slugs to every entry didn't change any page); TVL and `featured` only
// feed site-wide figures.
const CONTENT_FIELDS = [
  "title",
  "description",
  "extendedDescription",
  "tags",
  "partner",
  "github",
  "website",
  "image",
  "date",
  "issues",
] as const;

const fingerprint = (a: RawAudit) => JSON.stringify(CONTENT_FIELDS.map((f) => a[f] ?? null));

// The same audit in an older version: by slug, else title, else report link
const findPrevious = (entry: RawAudit, older: RawAudit[]) =>
  (entry.slug && older.find((o) => o.slug === entry.slug)) ||
  older.find((o) => o.title === entry.title) ||
  (entry.github && older.find((o) => o.github === entry.github)) ||
  undefined;

/**
 * For every audit in versions[0] (keyed by slug): the date of the newest version in
 * which its content differs from the version before, or in which it first appeared.
 * An audit unchanged through the whole history gets the oldest version's date.
 */
export const auditChangeDates = (versions: DataVersion[]): Map<string, string> => {
  const result = new Map<string, string>();
  if (!versions.length) return result;

  // Follow each current audit back through history, version by version
  let tracked = new Map(versions[0].audits.filter((a) => a.slug).map((a) => [a.slug!, a]));
  for (let i = 0; i < versions.length; i++) {
    const older = versions[i + 1]?.audits;
    const next = new Map<string, RawAudit>();
    for (const [slug, entry] of tracked) {
      const previous = older && findPrevious(entry, older);
      if (!previous || fingerprint(previous) !== fingerprint(entry)) result.set(slug, versions[i].date);
      else next.set(slug, previous);
    }
    tracked = next;
    if (!tracked.size) break;
  }
  return result;
};

/** Latest of several ISO dates (nulls ignored) */
export const latest = (...dates: (string | null | undefined)[]): string | undefined =>
  dates.filter((d): d is string => !!d).sort((a, b) => Date.parse(b) - Date.parse(a))[0];
