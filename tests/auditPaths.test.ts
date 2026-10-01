import { expect, test } from "vitest";
import { auditDate, relatedAudits, reportDate, resolveAuditPaths } from "../src/lib/auditPaths";

const report = (date: string) => `https://github.com/org/reports/blob/main/${date}%20Audit%20Report.pdf`;

test("pages live at the stored slug, whatever the title says", () => {
  expect(
    resolveAuditPaths([
      { title: "Stellar Core Protocol 23", slug: "stellar-core-protocol-23" },
      { title: "A renamed title", slug: "astroport-transmuter-pool" },
    ])
  ).toEqual(["/audits/stellar-core-protocol-23/", "/audits/astroport-transmuter-pool/"]);
});

test("a missing slug fails the build instead of falling back to the title", () => {
  expect(() => resolveAuditPaths([{ title: "Stellar Core" }])).toThrow(/"Stellar Core" has no slug/);
});

test("malformed slugs fail", () => {
  for (const slug of ["Stellar-Core", "stellar core", "-stellar", "stellar--core", "stellar/core"]) {
    expect(() => resolveAuditPaths([{ title: "Stellar Core", slug }]), slug).toThrow(/malformed slug/);
  }
});

test("duplicate slugs fail and name both audits", () => {
  expect(() =>
    resolveAuditPaths([
      { title: "Stellar Core", slug: "stellar-core" },
      { title: "Stellar Core again", slug: "stellar-core" },
    ])
  ).toThrow(/"stellar-core" is used by both "Stellar Core" and "Stellar Core again"/);
});

test("reads the report date from the PDF name", () => {
  expect(reportDate(report("2025-10-17"))).toBe("2025-10-17");
  expect(reportDate("https://example.com/report.pdf")).toBeNull();
});

test("the explicit date wins over the report file name", () => {
  expect(auditDate({ title: "A", date: "2026-02-27", github: report("2025-10-17") })).toBe("2026-02-27");
  expect(auditDate({ title: "A", github: report("2025-10-17") })).toBe("2025-10-17");
  expect(auditDate({ title: "A", date: "soon" })).toBeNull();
});

test("related audits share technology tags, ignoring generic ones", () => {
  const audits = [
    { title: "A", tags: ["Audit", "Rust", "CosmWasm"] },
    { title: "B", tags: ["Audit", "Blockchain"] },
    { title: "C", tags: ["Rust"] },
    { title: "D", tags: ["Rust", "CosmWasm"] },
  ];
  expect(relatedAudits(audits, 0)).toEqual([3, 2]);
});
