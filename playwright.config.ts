import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  globalSetup: "./tests/setup.ts",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
