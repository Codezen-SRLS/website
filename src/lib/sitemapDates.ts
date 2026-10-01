// Used by astro.config.ts, so it only imports plain data (no Astro virtual modules)
import raw from "../sharedData/data/audit-history.json" with { type: "json" };
import { auditDate, resolveAuditPaths, type RawAudit } from "./auditPaths";

const audits = raw as RawAudit[];
const paths = resolveAuditPaths(audits);
const byPath = new Map(paths.map((p, i) => [p, auditDate(audits[i])]));

export const auditLastmod = (pathname: string): string | undefined => byPath.get(pathname) || undefined;
