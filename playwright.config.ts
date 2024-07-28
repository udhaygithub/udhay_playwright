import { defineConfig, devices } from '@playwright/test';
const LT_USERNAME = 'udhanushkodi';
const LT_ACCESS_KEY = '3BwdYyKNKCJmeg56YFdbKVKtXgmEkL8QUksO9IZEz7qG8xioHN';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL: 'https://www.lambdatest.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: "Windows 10 - Chrome (latest)",
      use: {
        ...devices['Desktop Chrome'],
        browserName: "chromium",
        channel: 'chrome',
        browserVersion: "latest",
        "LT:Options": {
          platform: "Windows 10",
          build: "Playwright Sample Build",
          name: "Playwright Sample Test on Windows 10 - Chrome (latest)",
          user: LT_USERNAME,
          accessKey: LT_ACCESS_KEY,
          network: true,
          video: true,
          console: true,
        },
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'chrome',
              browserVersion: 'latest',
              platform: 'Windows 10',
              'LT:Options': {
                user: LT_USERNAME,
                accessKey: LT_ACCESS_KEY,
                network: true,
                video: true,
                console: true,
                name: "Playwright Sample Test on Windows 10 - Chrome (latest)",
              },
            })
          )}`,
        },
      },
    },
    {
      name: 'Windows 10 - Firefox (latest)',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        browserVersion: 'latest',
        "LT:Options": {
          platform: "Windows 10",
          build: "Playwright Sample Build",
          name: "Playwright Sample Test on Windows 10 - Firefox (latest)",
          user: LT_USERNAME,
          accessKey: LT_ACCESS_KEY,
          network: true,
          video: true,
          console: true,
        },
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'firefox',
              browserVersion: 'latest',
              platform: 'Windows 10',
              'LT:Options': {
                user: LT_USERNAME,
                accessKey: LT_ACCESS_KEY,
                network: true,
                video: true,
                console: true,
                name: "Playwright Sample Test on Windows 10 - Firefox (latest)",
              },
            })
          )}`,
        },
      },
    },
    {
      name: 'MacOS Catalina - Safari (latest)',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
        browserVersion: 'latest',
        "LT:Options": {
          platform: "MacOS Catalina",
          build: "Playwright Sample Build",
          name: "Playwright Sample Test on MacOS Catalina - Safari (latest)",
          user: LT_USERNAME,
          accessKey: LT_ACCESS_KEY,
          network: true,
          video: true,
          console: true,
        },
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'webkit',
              browserVersion: 'latest',
              platform: 'MacOS Catalina',
              'LT:Options': {
                user: LT_USERNAME,
                accessKey: LT_ACCESS_KEY,
                network: true,
                video: true,
                console: true,
                name: "Playwright Sample Test on MacOS Catalina - Safari (latest)",
              },
            })
          )}`,
        },
      },
    },
  ],
  reporter: [['html', { open: 'always' }]],
});
