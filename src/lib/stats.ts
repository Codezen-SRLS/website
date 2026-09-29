// Site-wide figures computed from the audit history at build time, so the numbers
// on the page can never drift from the published reports.
import type { Issues, RawAudit } from "./auditPaths";

const total = (i?: Issues) => (i ? (i.critical || 0) + (i.major || 0) + (i.minor || 0) + (i.informational || 0) : 0);

// Rounds down so the published figure never overstates the data, e.g. 2.99e9 -> "$2.9B+"
export const formatUsdFloor = (usd: number): string | null => {
  if (usd >= 1e9) return `$${Math.floor(usd / 1e8) / 10}B+`;
  if (usd >= 1e6) return `$${Math.floor(usd / 1e5) / 10}M+`;
  return null;
};

// Languages and frameworks shown in the lead auditor's breakdown
export const EXPERTISE_TAGS = ["Rust", "Golang", "CosmWasm", "Cosmos SDK", "Solidity", "Substrate", "Solana", "Move"];

// Tags that place an audit in a chain ecosystem
const ECOSYSTEM_TAGS: Record<string, string[]> = {
  Ethereum: ["ethereum", "solidity", "evm"],
  Cosmos: ["cosmos sdk", "cosmwasm", "cosmos hub", "ibc", "osmosis", "interchain security"],
  Polkadot: ["polkadot", "substrate"],
  Solana: ["solana", "anchor"],
  Sui: ["sui"],
  Stellar: ["stellar", "soroban"],
  Filecoin: ["filecoin"],
  Bitcoin: ["bitcoin"],
};

export const ecosystemsOf = (a: RawAudit) => {
  const tags = (a.tags || []).map((t) => t.toLowerCase());
  return Object.keys(ECOSYSTEM_TAGS).filter((eco) => ECOSYSTEM_TAGS[eco].some((t) => tags.includes(t)));
};

export const computeStats = (audits: RawAudit[]) => {
  const tvl = audits.reduce((sum, a) => sum + (a.tvlUsd || 0), 0);
  const ecosystems = new Set(audits.flatMap(ecosystemsOf));
  return {
    auditCount: audits.length,
    vulnCount: audits.reduce((sum, a) => sum + total(a.issues), 0),
    criticalCount: audits.reduce((sum, a) => sum + (a.issues?.critical || 0), 0),
    assetsProtected: formatUsdFloor(tvl),
    ecosystemCount: ecosystems.size,
  };
};

export const computeExpertise = (audits: RawAudit[], limit = 6) =>
  EXPERTISE_TAGS.map((tag) => ({ tag, count: audits.filter((a) => a.tags?.includes(tag)).length }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
