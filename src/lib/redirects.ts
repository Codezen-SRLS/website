// Audit URLs that changed when audit-history.json renamed or split an audit.
// GitHub Pages can't redirect, so Astro builds a redirect page (meta refresh +
// canonical) at each old URL.
// Used by astro.config.ts, so it only imports plain data (no Astro virtual modules)
import raw from "../sharedData/data/audit-history.json" with { type: "json" };
import type { RawAudit } from "./auditPaths";

// Redirects from before audits had permanent slugs (URLs were derived from titles)
const MANUAL_REDIRECTS: Record<string, string> = {
  // Typo fixes ("Astoport" → "Astroport", "Architechtural" → "Architectural")
  "/audits/astoport-concentrated-liquidity-pair/": "/audits/astroport-concentrated-liquidity-pair/",
  "/audits/astoport-maker-and-vesting-contracts/": "/audits/astroport-maker-and-vesting-contracts/",
  "/audits/astoport-transmuter-pool/": "/audits/astroport-transmuter-pool/",
  "/audits/drop-protocol-architechtural-changes-extension/": "/audits/drop-protocol-architectural-changes-extension/",
  // Renames
  "/audits/stellar-core/": "/audits/stellar-core-protocol-23/",
  "/audits/story-protocol-l1/": "/audits/data-network-story-protocol-l1/",
  "/audits/story-protocol-guardians/": "/audits/data-network-story-protocol-guardians/",
  // Split into several audits (sprints 1–3 and updates): show them all
  "/audits/gno-land-chain/": "/portfolio/?q=gno.land",
};

// Deliberate slug renames declared in audit-history.json ("previousSlugs"): a rename there
// needs no change here
const FROM_PREVIOUS_SLUGS: Record<string, string> = Object.fromEntries(
  (raw as RawAudit[]).flatMap((a) =>
    a.slug ? (a.previousSlugs ?? []).map((old) => [`/audits/${old}/`, `/audits/${a.slug}/`]) : [],
  ),
);

export const AUDIT_REDIRECTS: Record<string, string> = { ...MANUAL_REDIRECTS, ...FROM_PREVIOUS_SLUGS };
