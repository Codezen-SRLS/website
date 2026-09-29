import { expect, test } from "vitest";
import { relatedAudits, reportDate, resolveAuditPaths } from "../src/lib/auditPaths";

const report = (date: string) => `https://github.com/org/reports/blob/main/${date}%20Audit%20Report.pdf`;

test("uses the slugified title", () => {
  expect(resolveAuditPaths([{ title: "Story Protocol L1" }])).toEqual(["/audits/story-protocol-l1/"]);
});

test("strips accents and punctuation", () => {
  expect(resolveAuditPaths([{ title: "DAODAO's Polytone" }, { title: "Café Protocol!" }])).toEqual([
    "/audits/daodao-s-polytone/",
    "/audits/cafe-protocol/",
  ]);
});

test("an explicit slug wins over the title", () => {
  expect(resolveAuditPaths([{ title: "Stellar Core", slug: "stellar-core-protocol-23" }])).toEqual([
    "/audits/stellar-core-protocol-23/",
  ]);
});

test("colliding titles get their report dates appended", () => {
  expect(
    resolveAuditPaths([
      { title: "Stellar Core", github: report("2025-10-17") },
      { title: "Stellar  Core!", github: report("2024-03-02") },
    ])
  ).toEqual(["/audits/stellar-core-2025-10-17/", "/audits/stellar-core-2024-03-02/"]);
});

test("collisions that dates cannot resolve fail loudly", () => {
  expect(() =>
    resolveAuditPaths([{ title: "Stellar Core", github: report("2025-10-17") }, { title: "Stellar Core" }])
  ).toThrow(/Add a unique "slug"[\s\S]*Stellar Core, Stellar Core/);
});

test("an explicit slug that collides also fails", () => {
  expect(() => resolveAuditPaths([{ title: "Stellar Core" }, { title: "Other", slug: "stellar-core" }])).toThrow(
    /collide/
  );
});

test("reads the report date from the PDF name", () => {
  expect(reportDate(report("2025-10-17"))).toBe("2025-10-17");
  expect(reportDate("https://example.com/report.pdf")).toBeNull();
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
