// Audit data for pages: audit-history.json (git submodule src/sharedData) joined with
// page paths, report dates and optimised logo images.
import type { ImageMetadata } from "astro";
import raw from "../sharedData/data/audit-history.json";
import { relatedAudits, reportDate, resolveAuditPaths, type Issues, type RawAudit } from "./auditPaths";

export interface Audit extends RawAudit {
  index: number;
  path: string;
  slug: string;
  reportDate: string | null;
  logo?: ImageMetadata;
}

const logos = import.meta.glob<{ default: ImageMetadata }>("../sharedData/images/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
});
const logoByName = new Map(Object.entries(logos).map(([file, mod]) => [file.split("/").pop()!, mod.default]));

const rawAudits = raw as RawAudit[];
const paths = resolveAuditPaths(rawAudits);

export const audits: Audit[] = rawAudits.map((a, index) => ({
  ...a,
  index,
  path: paths[index],
  slug: paths[index].replace(/^\/audits\/|\/$/g, ""),
  reportDate: reportDate(a.github),
  logo: a.image ? logoByName.get(a.image.split("/").pop()!) : undefined,
}));

export const getRelated = (audit: Audit, limit = 3) => relatedAudits(rawAudits, audit.index, limit).map((i) => audits[i]);

export const SEVERITIES = [
  { key: "critical", label: "Critical", color: "#ff5c5c", text: "#ff7a7a" },
  { key: "major", label: "Major", color: "#f5b945", text: "#f5b945" },
  { key: "minor", label: "Minor", color: "#04d9ff", text: "#5be4ff" },
  { key: "informational", label: "Info", color: "rgba(232,238,255,0.45)", text: "rgba(232,238,255,0.55)" },
] as const;

export const totalFindings = (issues?: Issues) =>
  issues ? SEVERITIES.reduce((sum, s) => sum + (issues[s.key] || 0), 0) : 0;

// Tags that describe the engagement rather than the technology
export const GENERIC_TAGS = ["Audit", "Blockchain"];
export const techTags = (a: RawAudit) => (a.tags || []).filter((t) => !GENERIC_TAGS.includes(t));

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const joinList = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

// One-sentence summary shared by the audit page, its markdown twin and llms-full.txt
export const auditSummary = (a: Audit) => {
  const tech = techTags(a);
  const total = totalFindings(a.issues);
  return [
    `Codezen audited ${a.title}${a.partner ? ` together with ${a.partner}` : ""}.`,
    tech.length ? `Technologies in scope: ${joinList(tech)}.` : "",
    total > 0
      ? `We reported ${total} findings: ${joinList(
          SEVERITIES.filter((s) => (a.issues?.[s.key] || 0) > 0).map((s) => `${a.issues![s.key]} ${s.key}`)
        )}.`
      : "",
  ]
    .filter(Boolean)
    .join(" ");
};
