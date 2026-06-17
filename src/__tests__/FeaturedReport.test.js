import { render, screen } from "@testing-library/react";
import FeaturedReport from "../components/FeaturedReport";
import { FormProvider } from "../context/FormContext";

const MOCK_AUDIT = {
  title: "Stellar Core",
  partner: "Oak Security",
  tags: ["Blockchain", "C++", "Stellar"],
  github: "https://github.com/oak-security/report.pdf",
  featured: true,
  issues: { critical: 2, major: 1, minor: 35, informational: 43 },
};

const wrapper = ({ children }) => <FormProvider>{children}</FormProvider>;

test("renders generic audit title", () => {
  render(<FeaturedReport audit={MOCK_AUDIT} />, { wrapper });
  expect(screen.getByText("Smart Contract Security Review")).toBeInTheDocument();
});

test("renders client as confidential", () => {
  render(<FeaturedReport audit={MOCK_AUDIT} />, { wrapper });
  expect(screen.getByText("Confidential")).toBeInTheDocument();
});

test("renders severity labels", () => {
  render(<FeaturedReport audit={MOCK_AUDIT} />, { wrapper });
  expect(screen.getAllByText("Critical").length).toBeGreaterThan(0);
  expect(screen.getAllByText("High").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Medium").length).toBeGreaterThan(0);
});

test("renders total finding count", () => {
  render(<FeaturedReport audit={MOCK_AUDIT} />, { wrapper });
  expect(screen.getAllByText(/81 total/i).length).toBeGreaterThan(0);
});

test("renders CTA button", () => {
  render(<FeaturedReport audit={MOCK_AUDIT} />, { wrapper });
  expect(screen.getByText(/get an audit like this/i)).toBeInTheDocument();
});

test("returns null when no audit provided", () => {
  const { container } = render(<FeaturedReport audit={null} />, { wrapper });
  expect(container.firstChild).toBeNull();
});
