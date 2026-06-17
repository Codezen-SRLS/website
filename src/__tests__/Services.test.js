import { render, screen } from "@testing-library/react";
import Services from "../components/Services";

test("renders 3 service cards with correct titles", () => {
  render(<Services />);
  expect(screen.getByText("Smart Contract Audits")).toBeInTheDocument();
  expect(screen.getByText("Blockchain Consulting")).toBeInTheDocument();
  expect(screen.getByText("Disaster Recovery")).toBeInTheDocument();
});

test("renders section heading", () => {
  render(<Services />);
  expect(screen.getByText(/comprehensive security/i)).toBeInTheDocument();
});

test("renders service descriptions", () => {
  render(<Services />);
  expect(screen.getByText(/line-by-line review/i)).toBeInTheDocument();
  expect(screen.getByText(/expert guidance/i)).toBeInTheDocument();
  expect(screen.getByText(/rapid incident response/i)).toBeInTheDocument();
});
