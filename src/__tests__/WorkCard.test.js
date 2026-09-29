import { render, screen } from "@testing-library/react";
import WorkCard from "../components/WorkCard";

const MOCK_AUDIT = {
  title: "Test Protocol",
  description: "Smart Contract Audit",
  tags: ["Solana", "Rust", "Audit"],
  partner: "Oak Security",
  github: "https://github.com/example/report.pdf",
  website: "https://example.com",
};

test("renders title and description", () => {
  render(<WorkCard {...MOCK_AUDIT} />);
  expect(screen.getByText("Test Protocol")).toBeInTheDocument();
  expect(screen.getByText("Smart Contract Audit")).toBeInTheDocument();
});

test("renders partner name", () => {
  render(<WorkCard {...MOCK_AUDIT} />);
  expect(screen.getByText("with Oak Security")).toBeInTheDocument();
});

test("links to the external report when there is no audit page", () => {
  render(<WorkCard {...MOCK_AUDIT} />);
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://github.com/example/report.pdf");
});

test("renders first 3 tags", () => {
  render(<WorkCard {...MOCK_AUDIT} />);
  expect(screen.getByText("Solana")).toBeInTheDocument();
  expect(screen.getByText("Rust")).toBeInTheDocument();
  expect(screen.getByText("Audit")).toBeInTheDocument();
});

test("renders a plain block instead of a dead link when there is no URL", () => {
  const { container } = render(<WorkCard {...MOCK_AUDIT} github={null} website={null} />);
  expect(container.querySelector("a")).toBeNull();
});

test("links to its own audit page when a slug is given", () => {
  render(<WorkCard {...MOCK_AUDIT} slug="/audits/test-protocol/" />);
  expect(screen.getByRole("link")).toHaveAttribute("href", "/audits/test-protocol/");
});
