import { expect, test } from "vitest";
import { computeExpertise, computeStats, ecosystemsOf, formatUsdFloor } from "../src/lib/stats";

test("formats USD rounding down, never overstating", () => {
  expect(formatUsdFloor(2.99e9)).toBe("$2.9B+");
  expect(formatUsdFloor(1.25e6)).toBe("$1.2M+");
  expect(formatUsdFloor(999_999)).toBeNull();
});

const AUDITS = [
  { title: "A", tags: ["Rust", "CosmWasm"], issues: { critical: 2, major: 1, minor: 0, informational: 3 }, tvlUsd: 2e9, featured: true },
  { title: "B", tags: ["Solidity", "Ethereum"], issues: { critical: 0, major: 0, minor: 10, informational: 10 }, tvlUsd: 5e8, featured: true },
  { title: "C", tags: ["Rust", "Solana"], featured: false },
];

test("computes site-wide figures from the audit list", () => {
  expect(computeStats(AUDITS)).toEqual({
    auditCount: 3,
    vulnCount: 26,
    criticalCount: 2,
    assetsProtected: "$2.5B+",
    ecosystemCount: 3,
  });
});

test("maps tags to ecosystems", () => {
  expect(ecosystemsOf({ title: "x", tags: ["Substrate", "Rust"] })).toEqual(["Polkadot"]);
  expect(ecosystemsOf({ title: "x", tags: ["Anchor"] })).toEqual(["Solana"]);
});

test("expertise is ranked by audit count", () => {
  expect(computeExpertise(AUDITS)).toEqual([
    { tag: "Rust", count: 2 },
    { tag: "CosmWasm", count: 1 },
    { tag: "Solidity", count: 1 },
    { tag: "Solana", count: 1 },
  ]);
});
