const { resolveAuditPaths } = require("../../gatsby-node");

const report = (date) => `https://github.com/org/reports/blob/main/${date}%20Audit%20Report.pdf`;

test("uses the slugified title", () => {
  const paths = resolveAuditPaths([{ id: "a", title: "Story Protocol L1" }]);
  expect(paths.get("a")).toBe("/audits/story-protocol-l1/");
});

test("an explicit slug wins over the title", () => {
  const paths = resolveAuditPaths([{ id: "a", title: "Stellar Core", slug: "stellar-core-protocol-23" }]);
  expect(paths.get("a")).toBe("/audits/stellar-core-protocol-23/");
});

test("colliding titles get their report dates appended", () => {
  const paths = resolveAuditPaths([
    { id: "a", title: "Stellar Core", github: report("2025-10-17") },
    { id: "b", title: "Stellar  Core!", github: report("2024-03-02") },
  ]);
  expect(paths.get("a")).toBe("/audits/stellar-core-2025-10-17/");
  expect(paths.get("b")).toBe("/audits/stellar-core-2024-03-02/");
});

test("collisions that dates cannot resolve fail loudly", () => {
  expect(() =>
    resolveAuditPaths([
      { id: "a", title: "Stellar Core", github: report("2025-10-17") },
      { id: "b", title: "Stellar Core" },
    ])
  ).toThrow(/Add a unique "slug"[\s\S]*Stellar Core, Stellar Core/);
});

test("an explicit slug that collides also fails", () => {
  expect(() =>
    resolveAuditPaths([
      { id: "a", title: "Stellar Core" },
      { id: "b", title: "Other", slug: "stellar-core" },
    ])
  ).toThrow(/collide/);
});
