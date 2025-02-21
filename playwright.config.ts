import { defineConfig, devices } from '@playwright/test';
//require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config(); 
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL || '',
    httpCredentials: {
      username: process.env.HTTP_USERNAME || '',
      password: process.env.HTTP_PASSWORD || '',
    },
    //headless: true,
    viewport: { width: 1280, height: 720 },
    //video: 'retain-on-failure',
    //
    // screenshot: 'only-on-failure',
    browserName: 'chromium', // Default browser (chromium, firefox, webkit)
    //headless: false, // Run tests in a visible browser
    //launchOptions: {
    //  slowMo: 500, // Slow down browser operations for debugging},
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: [['html'], ['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /*reporter: [
    ['list'], // Default console output
    ['html', { outputFolder: 'playwright-report' }], // Generate an HTML report
    ['json', { outputFile: 'results.json' }], // Save results to a JSON file
  ],*/

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', viewport: { width: 1920, height: 1080 } },
      dependencies: ['setup']
    },
    {
      name: 'setup',
      use: { browserName: 'chromium', viewport: { width: 1920, height: 1080 } },
      testMatch: '*setup/*.ts'
    }
  ]

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
