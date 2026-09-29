import { expect, test } from "vitest";
import { searchAudits } from "../src/lib/auditSearch";

const AUDITS = [
  { title: "Stellar Core", description: "Blockchain node audit", tags: ["C++", "Rust", "Stellar"], partner: "Oak Security", extendedDescription: "Audit of the Stellar Core." },
  { title: "Osmosis CosmWasm Pool", description: "CosmWasm audit", tags: ["CosmWasm", "Rust"], partner: "Oak Security", extendedDescription: "Pool contracts." },
  { title: "Meteora DAMM v2", description: "Solana program audit", tags: ["Solana", "Rust"], partner: "Zenith Security", extendedDescription: "Dynamic AMM on Stellar-like design." },
];
const titles = (list: { title: string }[]) => list.map((a) => a.title);

test("an empty query returns every audit in its original order", () => {
  expect(titles(searchAudits(AUDITS, "   "))).toEqual(titles(AUDITS));
});

test("matching ignores case and accents", () => {
  expect(titles(searchAudits(AUDITS, "CÖSMWASM"))).toEqual(["Osmosis CosmWasm Pool"]);
});

test("every word must match", () => {
  expect(titles(searchAudits(AUDITS, "rust zenith"))).toEqual(["Meteora DAMM v2"]);
  expect(searchAudits(AUDITS, "rust nothing-like-this")).toEqual([]);
});

test("title matches rank above matches in the description", () => {
  expect(titles(searchAudits(AUDITS, "stellar"))).toEqual(["Stellar Core", "Meteora DAMM v2"]);
});

test("searches partner names", () => {
  expect(titles(searchAudits(AUDITS, "oak"))).toEqual(["Stellar Core", "Osmosis CosmWasm Pool"]);
});
