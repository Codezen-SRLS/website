// Sitemap <lastmod> for every page: when its content last changed, from git history.
// Used by astro.config.ts, so it only imports plain data (no Astro virtual modules).
import { execFileSync } from "node:child_process";
import path from "node:path";
import raw from "../sharedData/data/audit-history.json" with { type: "json" };
import { auditDate, isAudit, resolveAuditPaths, type RawAudit } from "./auditPaths";
import { auditChangeDates, latest, type DataVersion } from "./lastmod";

const ROOT = process.cwd();
const SUBMODULE = path.join(ROOT, "src/sharedData");
const DATA_FILE = "data/audit-history.json";

const git = (cwd: string, args: string[]) =>
  execFileSync("git", args, { cwd, encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }).trim();

// Shallow clones (CI's default) have no history to date changes from
const hasHistory = (cwd: string) => {
  try {
    return git(cwd, ["rev-parse", "--is-shallow-repository"]) === "false";
  } catch {
    return false;
  }
};

const lastCommitDate = (paths: string[]) => {
  try {
    return git(ROOT, ["log", "-1", "--format=%cI", "--", ...paths]) || undefined;
  } catch {
    return undefined;
  }
};

const audits = (raw as RawAudit[]).filter(isAudit);
const paths = resolveAuditPaths(audits);

const auditDates = (() => {
  if (hasHistory(SUBMODULE)) {
    const commits = git(SUBMODULE, ["log", "--format=%H %cI", "--", DATA_FILE]).split("\n").filter(Boolean);
    const versions: DataVersion[] = commits.map((line) => {
      const [hash, date] = line.split(" ");
      const data = JSON.parse(git(SUBMODULE, ["show", `${hash}:${DATA_FILE}`])) as RawAudit[];
      return { date, audits: data.filter(isAudit) };
    });
    // Uncommitted local edits to the data count as changed now
    const head = versions[0]?.audits;
    if (head && JSON.stringify(head) !== JSON.stringify(audits)) versions.unshift({ date: new Date().toISOString(), audits });
    return auditChangeDates(versions);
  }
  console.warn("[sitemap] src/sharedData has no git history (shallow clone): falling back to report dates for lastmod");
  return new Map(audits.map((a) => [a.slug!, auditDate(a) ?? undefined]).filter((e): e is [string, string] => !!e[1]));
})();

const byPath = new Map<string, string>();
paths.forEach((p, i) => {
  const date = auditDates.get(audits[i].slug!);
  if (date) byPath.set(p, date);
});

// Pages listing audits change whenever an audit does, or when their own source does
const newestAudit = latest(...auditDates.values());
const siteHistory = hasHistory(ROOT);
const pageSources: Record<string, string[]> = {
  "/": ["src/pages/index.astro", "src/components/home", "src/data.json"],
  "/portfolio/": ["src/pages/portfolio.astro", "src/components/AuditCard.astro"],
  "/privacy-policy/": ["src/pages/privacy-policy.astro"],
};
for (const [page, sources] of Object.entries(pageSources)) {
  const own = siteHistory ? lastCommitDate(sources) : undefined;
  const date = page === "/privacy-policy/" ? own : latest(own, newestAudit);
  if (date) byPath.set(page, date);
}

export const pageLastmod = (pathname: string): string | undefined => byPath.get(pathname);
