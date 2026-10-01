// Audit URLs that changed when audit-history.json renamed or split an audit.
// GitHub Pages can't redirect, so Astro builds a redirect page (meta refresh +
// canonical) at each old URL. Add an entry whenever an audit's title changes.
export const AUDIT_REDIRECTS: Record<string, string> = {
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
