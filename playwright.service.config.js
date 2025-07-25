import { trace } from 'console';

const { defineConfig } = require('@playwright/test');
const { getServiceConfig, ServiceOS } = require('@azure/microsoft-playwright-testing');
const config = require('./playwright.config');

/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(
  config,
  getServiceConfig(config, {
    use: {
      trace: 'on',
      screenshot: 'retain-on-failure',
      video: 'retain-on-failure'},
    exposeNetwork: '<loopback>',
    timeout: 30000,
    os: ServiceOS.LINUX,
    useCloudHostedBrowsers: true // Set to false if you want to only use reporting and not cloud hosted browsers
  }),
  {
    /* 
    Playwright Testing service reporter is added by default.
    This will override any reporter options specified in the base playwright config.
    If you are using more reporters, please update your configuration accordingly.
    */
    reporter: [['list'], ['@azure/microsoft-playwright-testing/reporter']],
  }
);
