import { defineConfig, devices } from "@playwright/test";

// Runs against a production build with dummy analytics/EmailJS IDs; third-party
// requests are intercepted in the specs, so nothing reaches Google, Microsoft or EmailJS.
const PORT = 4400;
export const TEST_ENV = {
  GA_TRACKING_ID: "G-E2ETEST",
  GATSBY_CLARITY_ID: "e2eclarity",
  GATSBY_EMAILJS_SERVICE_ID: "service_e2e",
  GATSBY_EMAILJS_TEMPLATE_ID: "template_e2e",
  GATSBY_EMAILJS_PUBLIC_KEY: "public_e2e",
};

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: `http://localhost:${PORT}`, trace: "on-first-retry" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "iphone", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
    { name: "pixel", use: { ...devices["Pixel 7"] } },
    { name: "ipad", use: { ...devices["iPad (gen 7)"], defaultBrowserType: "chromium" } },
  ],
  webServer: {
    command: `npm run build && npx astro preview --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300000,
    env: TEST_ENV,
  },
});
