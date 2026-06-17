import { render, screen } from "@testing-library/react";
import Stats from "../components/Stats";

test("renders audit count and vulnerability count", () => {
  render(<Stats auditCount={122} vulnCount={1693} assetsProtected="$1.2B+" criticalCount={48} />);
  expect(screen.getByText("122+")).toBeInTheDocument();
  expect(screen.getByText("1693+")).toBeInTheDocument();
  expect(screen.getByText("$1.2B+")).toBeInTheDocument();
  expect(screen.getByText("48+")).toBeInTheDocument();
  expect(screen.getByText("Critical findings")).toBeInTheDocument();
});

test("renders stat labels", () => {
  render(<Stats auditCount={100} vulnCount={600} assetsProtected="$1B+" />);
  expect(screen.getByText("Completed audits")).toBeInTheDocument();
  expect(screen.getByText("Vulnerabilities found")).toBeInTheDocument();
  expect(screen.getByText("Assets protected")).toBeInTheDocument();
});
