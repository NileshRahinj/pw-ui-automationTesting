import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// ✅ LOAD .env BEFORE ANYTHING ELSE
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 100 * 1000,

  reporter: [
  ['list'], // keep console output
  ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML report for Jenkins
  ['allure-playwright', { outputFolder: 'allure-results' }] // optional, keep Allure if you use it
],

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
