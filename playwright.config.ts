import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: "http://localhost:8000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 12"] } },
  ],
  webServer: {
    command: "npm run develop",
    url: "http://localhost:8000",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
