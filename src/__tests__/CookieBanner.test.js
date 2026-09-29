import { render, screen, fireEvent, act } from "@testing-library/react";
import CookieBanner from "../components/CookieBanner";
import { openCookieSettings } from "../lib/consent";

beforeEach(() => window.localStorage.clear());

test("asks for consent on first visit", () => {
  render(<CookieBanner />);
  expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
});

test("remembers a rejection and stays hidden", () => {
  const { unmount } = render(<CookieBanner />);
  fireEvent.click(screen.getByText("Reject"));
  expect(window.localStorage.getItem("cz-analytics-consent")).toBe("denied");
  expect(screen.queryByRole("region", { name: /cookie consent/i })).not.toBeInTheDocument();
  unmount();
  render(<CookieBanner />);
  expect(screen.queryByRole("region", { name: /cookie consent/i })).not.toBeInTheDocument();
});

test("reopens from cookie settings", () => {
  window.localStorage.setItem("cz-analytics-consent", "granted");
  render(<CookieBanner />);
  expect(screen.queryByRole("region", { name: /cookie consent/i })).not.toBeInTheDocument();
  act(() => openCookieSettings());
  expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
});
