// @vitest-environment happy-dom
import { beforeEach, expect, test, vi } from "vitest";

vi.mock("@microsoft/clarity", () => ({ default: { init: vi.fn(), consentV2: vi.fn(), setTag: vi.fn() } }));

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  localStorage.clear();
  document.head.innerHTML = "";
  delete (window as { gtag?: unknown }).gtag;
});

const load = async () => {
  vi.stubEnv("GA_TRACKING_ID", "G-TEST");
  vi.stubEnv("GATSBY_CLARITY_ID", "clarity-test");
  const consent = await import("../src/lib/consent");
  const { default: Clarity } = await import("@microsoft/clarity");
  return { ...consent, Clarity };
};

test("nothing loads without consent", async () => {
  const { getConsent } = await load();
  expect(getConsent()).toBeNull();
  expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
});

test("accepting stores consent, loads GA and Clarity, and sends a page view", async () => {
  const { acceptAnalytics, getConsent, Clarity } = await load();
  await acceptAnalytics();
  expect(getConsent()).toBe("granted");
  expect(document.querySelector<HTMLScriptElement>('script[src*="googletagmanager"]')?.src).toContain("id=G-TEST");
  const calls = (window.dataLayer as IArguments[]).map((a) => Array.from(a));
  expect(calls).toContainEqual(["consent", "default", expect.objectContaining({ analytics_storage: "granted", ad_storage: "denied" })]);
  expect(calls).toContainEqual(["config", "G-TEST", { send_page_view: false }]);
  expect(calls.find((c) => c[0] === "event" && c[1] === "page_view")).toBeTruthy();
  expect(Clarity.init).toHaveBeenCalledWith("clarity-test");
});

test("rejecting stores the choice and clears analytics cookies", async () => {
  const { rejectAnalytics, getConsent } = await load();
  document.cookie = "_ga=GA1.1.123; path=/";
  document.cookie = "keep=1; path=/";
  await rejectAnalytics();
  expect(getConsent()).toBe("denied");
  expect(document.cookie).not.toContain("_ga=");
  expect(document.cookie).toContain("keep=1");
});

test("cookie settings reopen through an event", async () => {
  const { openCookieSettings, onOpenCookieSettings } = await load();
  const handler = vi.fn();
  onOpenCookieSettings(handler);
  openCookieSettings();
  expect(handler).toHaveBeenCalledOnce();
});
