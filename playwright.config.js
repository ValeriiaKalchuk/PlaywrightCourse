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
  // workers: 7,
  // the above will set the number of workers to run tests in parallel
  reporter: 'html',
  // the above is used if you want to have reports
  use: {
        browserName: 'chromium',
        headless: true,
        // the above will enable headed browser launch
        screenshot: 'on',
        // the above will enable taking a screenshot on each taken step
        // video: 'retain-on-failure',
        // the above will enable taking videos on each taken step
        trace: 'retain-on-failure',
        // the above will enable taking traces on each taken step. If it is "on", it will be enable to save logs for api
        // viewport: { width: 1280, height: 720 },
        // the above will set the window size for the browser
        // ...devices['iPad (gen 11)']
        //the above will set the device to be used for testing
        // ignoreHTTPSErrors: true,
        // the above will ignore https errors with SSL certifications issues
        // permissions: ['geolocation'],
        // the above will allow geolocation permissions
        // retries: 2,
        // the above will retry failed tests 2 times
  },

});

