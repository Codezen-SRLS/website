import { expect, test } from "vitest";
import { auditChangeDates, latest, type DataVersion } from "../src/lib/lastmod";

const A = { title: "Stellar Core", slug: "stellar-core", extendedDescription: "Audit of Stellar.", issues: { critical: 2 } };
const B = { title: "Tellor", slug: "tellor", extendedDescription: "Audit of Tellor." };

// Newest first, as `git log` lists them
const history = (...versions: [string, object[]][]): DataVersion[] =>
  versions.map(([date, audits]) => ({ date, audits: audits as DataVersion["audits"] }));

test("an audit's lastmod is the newest version that changed its content", () => {
  const dates = auditChangeDates(
    history(
      ["2026-10-01", [{ ...A, extendedDescription: "Stellar is an open network; this audit covered Protocol 23." }, B]],
      ["2026-09-20", [A, B]],
      ["2026-09-01", [A, B]]
    )
  );
  expect(dates.get("stellar-core")).toBe("2026-10-01");
  expect(dates.get("tellor")).toBe("2026-09-01"); // unchanged since the oldest version
});

test("a newly added audit is dated by the version that added it", () => {
  const dates = auditChangeDates(history(["2026-10-01", [A, B]], ["2026-09-20", [A, B]], ["2026-09-01", [A]]));
  expect(dates.get("tellor")).toBe("2026-09-20");
});

test("adding slugs to the data doesn't count as a page change", () => {
  const { slug: _a, ...noSlugA } = A;
  const { slug: _b, ...noSlugB } = B;
  const dates = auditChangeDates(history(["2026-10-01", [A, B]], ["2026-09-01", [noSlugA, noSlugB]]));
  expect(dates.get("stellar-core")).toBe("2026-09-01");
  expect(dates.get("tellor")).toBe("2026-09-01");
});

test("a renamed audit counts as changed when the title changed", () => {
  const renamed = { ...A, title: "Stellar Core Protocol 23", github: "https://x/report.pdf" };
  const before = { ...A, slug: undefined, github: "https://x/report.pdf" };
  const dates = auditChangeDates(history(["2026-10-01", [renamed]], ["2026-09-25", [renamed]], ["2026-09-01", [before]]));
  expect(dates.get("stellar-core")).toBe("2026-09-25");
});

test("finding counts are page content", () => {
  const dates = auditChangeDates(history(["2026-10-01", [{ ...A, issues: { critical: 3 } }]], ["2026-09-01", [A]]));
  expect(dates.get("stellar-core")).toBe("2026-10-01");
});

test("latest picks the newest ISO date and ignores missing ones", () => {
  expect(latest("2026-09-29T22:00:17+02:00", undefined, "2026-10-01T15:57:20+02:00", null)).toBe("2026-10-01T15:57:20+02:00");
  expect(latest()).toBeUndefined();
});
