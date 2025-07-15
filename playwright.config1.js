// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  // the above is a declaration of which tests are to be run
  timeout: 30*1000,
  // the above timeout is for components
  expect: {
    timeout: 5000,
    // the above timeout is for assertions
  },
  reporter: 'html',
  // the above is used if you want to have reports
  projects: [
  // the above is used to define different configurations, to run a specific configuration, use the command below:
  // npx playwright test tests/PlaceAnOrderPO.spec.js --config playwright.config1.js --project=safari
    { name: 'safari',
      use: {
          browserName: 'webkit',
          headless: true,
          // the above will enable headed browser launch
          screenshot: 'only-on-failure',
          // the above will enable taking a screenshot on each taken step, options: only-on-failure, on, off
          trace: 'retain-on-failure'
          // the above will enable taking traces on each taken step. If it is "on", it will be enable to save logs for api
          // the above will enable taking traces on each taken step. If it is "on", it will be enable to save logs for api
          // viewport: { width: 1280, height: 720 },
          // the above will set the window size for the browser
          // ...devices['iPad (gen 11)']
          //the above will set the device to be used for testing
    }},
    {
      name: 'chrome',
      use: {
          browserName: 'chromium',
          headless: false,
          screenshot: 'on',
          trace: 'retain-on-failure'
      }
    }
  ]

});

