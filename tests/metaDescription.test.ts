import { describe, expect, test } from "vitest";
import { auditMetaDescription, clampWords, leadWithin, META_DESCRIPTION_MAX } from "../src/lib/seo";

const kinetic =
  "Kinetic Money is a Terra protocol offering self-repaying loans, using deposit yield to reduce debt; this audit covered its CosmWasm contracts for the vault, phaser, Anchor adapter, coordinator and protocol tokens.";

const base = { title: "Kinetic", label: "CosmWasm smart contract audit", partner: "Oak Security", findings: 26 };

describe("auditMetaDescription", () => {
  test("a long description is cut at the last sentence boundary that fits", () => {
    const text =
      "Acme is a lending protocol on Osmosis. This audit covered its CosmWasm contracts for the vault, oracle and liquidation engine. The second phase reviewed the governance module, the fee collector and every migration path in detail.";
    const out = auditMetaDescription({ ...base, extendedDescription: text });
    expect(out.startsWith("Acme is a lending protocol on Osmosis. This audit covered its CosmWasm contracts for the vault, oracle and liquidation engine.")).toBe(true);
    expect(out).not.toContain("second phase");
    expect(out.length).toBeLessThanOrEqual(160);
  });

  test("a long single sentence is cut at a word boundary with an ellipsis", () => {
    const text =
      "Acme is a cross-chain liquidity protocol connecting Ethereum, Solana and Cosmos zones through a shared settlement layer with intent-based routing, batch auctions, solver bonds and optimistic verification of every fill";
    const out = auditMetaDescription({ ...base, extendedDescription: text });
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toMatch(/\s…$/); // no space before the ellipsis
    const head = out.slice(0, -1);
    expect(text.startsWith(head)).toBe(true);
    expect(text[head.length]).toBe(" "); // the cut fell between words
    expect(out.length).toBeLessThanOrEqual(160);
  });

  test("a semicolon sentence is cut at the clause boundary and closed with a full stop", () => {
    const out = auditMetaDescription({ ...base, extendedDescription: kinetic });
    expect(out).toBe(
      "Kinetic Money is a Terra protocol offering self-repaying loans, using deposit yield to reduce debt. CosmWasm smart contract audit by Codezen with Oak Security."
    );
  });

  test("suffix parts are dropped (finding count first, then the firm) when there is no room", () => {
    const lead = "Acme is a lending protocol.";
    const full = `${lead} CosmWasm smart contract audit by Codezen with Oak Security, 26 findings.`;
    const noCount = `${lead} CosmWasm smart contract audit by Codezen with Oak Security.`;
    const labelOnly = `${lead} CosmWasm smart contract audit by Codezen.`;
    const at = (max: number) => auditMetaDescription({ ...base, extendedDescription: lead }, max);
    expect(at(full.length)).toBe(full);
    expect(at(full.length - 1)).toBe(noCount);
    expect(at(noCount.length - 1)).toBe(labelOnly);
    expect(at(labelOnly.length - 1)).toBe(lead);
  });

  test("the suffix is dropped entirely rather than shortening a description that fills the space", () => {
    const text = `${"Acme is a protocol ".repeat(8)}for loans.`; // 162 chars, no boundaries
    const out = auditMetaDescription({ ...base, extendedDescription: text });
    expect(out).not.toContain("by Codezen");
    expect(out.length).toBeLessThanOrEqual(160);
  });

  test("an empty description falls back to the label template, cut at a word boundary", () => {
    expect(auditMetaDescription({ ...base, extendedDescription: "" })).toBe(
      "Kinetic security audit by Codezen (CosmWasm smart contract audit) with Oak Security: 26 findings reported."
    );
    const long = auditMetaDescription({
      ...base,
      title: "A Very Long Protocol Name With Many Words In It",
      label: "Solidity and CosmWasm smart contract audit plus economic review",
      partner: "Oak Security and Another Partner Firm",
      extendedDescription: "   ",
    });
    expect(long.length).toBeLessThanOrEqual(160);
    expect(long.endsWith("…")).toBe(true);
    expect(long).not.toMatch(/\s…$/);
  });

  test("one finding is singular, zero findings are omitted", () => {
    const lead = "Acme is a lending protocol.";
    expect(auditMetaDescription({ ...base, findings: 1, extendedDescription: lead })).toMatch(/, 1 finding\.$/);
    expect(auditMetaDescription({ ...base, findings: 0, extendedDescription: lead })).toMatch(/with Oak Security\.$/);
  });

  test("plain text: whitespace is collapsed and there are no double spaces", () => {
    const out = auditMetaDescription({ ...base, extendedDescription: "  Acme  is a\nlending   protocol  " });
    expect(out).toBe("Acme is a lending protocol. CosmWasm smart contract audit by Codezen with Oak Security, 26 findings.");
    expect(out).not.toMatch(/ {2}/);
  });

  test("the result is never over 160 characters", () => {
    const words = "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau".split(" ");
    for (let n = 0; n < 400; n++) {
      // Deterministic mix of lengths, sentence ends, semicolons and long words
      const parts: string[] = [];
      for (let i = 0; i < (n % 60) + 1; i++) {
        const w = words[(n * 7 + i * 3) % words.length];
        parts.push(i % 11 === 10 ? `${w}.` : i % 13 === 12 ? `${w};` : (n + i) % 17 === 0 ? w.repeat(6) : w);
      }
      const text = parts.join(" ").replace(/(^|\. )([a-z])/g, (_, p, c) => p + c.toUpperCase());
      for (const findings of [0, 1, 26]) {
        for (const partner of ["", "Oak Security"]) {
          const out = auditMetaDescription({ ...base, partner, findings, extendedDescription: n % 23 === 0 ? "" : text });
          expect(out.length, out).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
          expect(out).not.toMatch(/ {2}|\s…|\s$/);
        }
      }
    }
  });
});

describe("helpers", () => {
  test("clampWords never cuts a word and keeps short text unchanged", () => {
    expect(clampWords("Stellar Core Protocol 23", 34)).toBe("Stellar Core Protocol 23");
    expect(clampWords("Solidity and CosmWasm smart contract audit · Oak Security", 48)).toBe(
      "Solidity and CosmWasm smart contract audit ·…".replace(" ·…", "…")
    );
  });

  test("leadWithin ignores abbreviations that aren't sentence ends", () => {
    const text = "Acme supports many chains, e.g. Osmosis and Neutron, and runs keepers; this audit covered the vault and router contracts in full depth today.";
    expect(leadWithin(text, 100)).toBe("Acme supports many chains, e.g. Osmosis and Neutron, and runs keepers.");
  });
});
