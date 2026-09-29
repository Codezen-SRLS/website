import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/header";
import { FormProvider } from "../context/FormContext";

const wrapper = ({ children }) => <FormProvider>{children}</FormProvider>;

test("renders logo wordmark image", () => {
  render(<Header />, { wrapper });
  expect(screen.getByAltText("Codezen")).toBeInTheDocument();
});

test("renders nav links", () => {
  render(<Header />, { wrapper });
  expect(screen.getByText("Services")).toBeInTheDocument();
  expect(screen.getByText("Process")).toBeInTheDocument();
  expect(screen.getByText("Reports")).toBeInTheDocument();
  expect(screen.getByText("Work")).toBeInTheDocument();
});

test("renders get an audit button", () => {
  render(<Header />, { wrapper });
  expect(screen.getAllByText(/get an audit/i).length).toBeGreaterThan(0);
});

test("hamburger button exists", () => {
  render(<Header />, { wrapper });
  expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
});

test("hamburger toggles mobile menu", () => {
  render(<Header />, { wrapper });
  const hamburger = screen.getByLabelText(/open menu/i);
  fireEvent.click(hamburger);
  expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();
});

test("section links point back to the home page on other pages", () => {
  const router = require("@reach/router");
  router.__setPathname("/privacy-policy/");
  try {
    render(<Header />, { wrapper });
    expect(screen.getByText("Services").closest("a")).toHaveAttribute("href", "/#services");
  } finally {
    router.__setPathname("/");
  }
});
