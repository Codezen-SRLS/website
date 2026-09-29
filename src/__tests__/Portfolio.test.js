import { render, screen, fireEvent, within } from "@testing-library/react";
import PortfolioPage from "../pages/portfolio";

const audit = (title, tags, i) => ({
  title,
  description: "Smart contract audit",
  extendedDescription: `Audit of ${title}.`,
  tags,
  partner: "Oak Security",
  github: `https://github.com/example/${i}.pdf`,
  website: null,
  pagePath: `/audits/${title.toLowerCase().replace(/\s+/g, "-")}/`,
  image: null,
  issues: null,
});

const AUDITS = [
  audit("Stellar Core", ["Blockchain", "Rust", "Stellar"], 0),
  ...Array.from({ length: 14 }, (_, i) => audit(`Cosmos Chain ${i}`, ["Blockchain", "Golang", "Cosmos SDK"], i + 1)),
];
const data = { allAuditHistoryJson: { nodes: AUDITS } };

const visibleTitles = () =>
  screen
    .getAllByRole("heading", { level: 3 })
    .filter((h) => !h.closest("[hidden]"))
    .map((h) => h.textContent);

// jsdom has no IntersectionObserver (used by Layout's scroll reveal)
beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

beforeEach(() => window.history.replaceState(null, "", "/portfolio/"));

test("shows the first page of audits and keeps the rest in the HTML", () => {
  render(<PortfolioPage data={data} location={{ search: "" }} />);
  expect(visibleTitles()).toHaveLength(12);
  expect(screen.getAllByRole("heading", { level: 3, hidden: true })).toHaveLength(15);
});

test("filters audits as you type and reports the count", () => {
  render(<PortfolioPage data={data} location={{ search: "" }} />);
  fireEvent.change(screen.getByLabelText("Search audits", { selector: "input" }), { target: { value: "stellar" } });
  expect(visibleTitles()).toEqual(["Stellar Core"]);
  expect(screen.getByRole("status")).toHaveTextContent("1 audit matches “stellar”");
  expect(window.location.search).toBe("?q=stellar");
  expect(screen.queryByText(/load more/i)).not.toBeInTheDocument();
});

test("shows an empty state that clears the search", () => {
  render(<PortfolioPage data={data} location={{ search: "" }} />);
  fireEvent.change(screen.getByLabelText("Search audits", { selector: "input" }), { target: { value: "zzz" } });
  expect(screen.getByRole("status")).toHaveTextContent("No audits match “zzz”");
  expect(screen.getByText("Try a project name, a chain like Cosmos or Solana, or a language like Rust.")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Clear search"));
  expect(visibleTitles()).toHaveLength(12);
  expect(window.location.search).toBe("");
});

test("technology chips toggle a search", () => {
  render(<PortfolioPage data={data} location={{ search: "" }} />);
  const chips = within(screen.getByRole("group", { name: /popular technologies/i }));
  fireEvent.click(chips.getByText("Golang"));
  expect(visibleTitles()).toHaveLength(14);
  expect(chips.getByText("Golang")).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(chips.getByText("Golang"));
  expect(visibleTitles()).toHaveLength(12);
});

test("reads the initial query from the URL", () => {
  render(<PortfolioPage data={data} location={{ search: "?q=stellar" }} />);
  expect(visibleTitles()).toEqual(["Stellar Core"]);
});
