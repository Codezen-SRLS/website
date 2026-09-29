import type { Page, Request } from "@playwright/test";

export const isAnalytics = (url: string) => /googletagmanager\.com|google-analytics\.com|clarity\.ms/.test(url);

// Stub third-party scripts and record every request to them
export const trackThirdParty = async (page: Page) => {
  const requests: string[] = [];
  await page.route(/googletagmanager\.com|google-analytics\.com|clarity\.ms/, (route) => {
    requests.push(route.request().url());
    return route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
  });
  return requests;
};

export const pageViews = (page: Page) =>
  page.evaluate(() =>
    ((window as unknown as { dataLayer?: IArguments[] }).dataLayer || [])
      .map((a) => Array.from(a))
      .filter((a) => a[0] === "event" && a[1] === "page_view")
      .map((a) => (a[2] as { page_path: string }).page_path)
  );

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 900;

export type { Request };
