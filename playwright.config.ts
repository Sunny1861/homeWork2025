import { PlaywrightTestConfig, devices } from '@playwright/test';

// Config to hold extra properties
interface TestConfig extends PlaywrightTestConfig {
  baseUrl: string;
  apiURL: string;
}

// default configuration you expect to have for every environment
const defaultConfig: PlaywrightTestConfig = {
  timeout: 60000,
  expect: {
    timeout: 50000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['junit', { outputFile: 'results.xml' }]],
  use: {
    actionTimeout: 0,
    trace: 'on',
    baseURL: 'https://app.insomnia.rest',
  },
  projects: [
    // Setup project
    {
      name: 'setup', 
      testMatch: /.*\.setup\.ts/
    },

    {
      name: 'authorize', 
      testMatch: '**/authorize.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      }
    },

    /* Test against desktop browsers */
    {
      name: 'chromium',
      testIgnore: '**/authorize.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      testIgnore: '**/authorize.spec.ts',
      use: { ...devices['Desktop Firefox'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      testIgnore: '**/authorize.spec.ts',
      use: { ...devices['Desktop Safari'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    /* Test against branded browsers. */
    {
      name: 'GoogleChrome',
      testIgnore: '**/authorize.spec.ts',
      use: { ...devices['Desktop Chrome'], channel: 'chrome',
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'MicrosoftEdge',
      testIgnore: '**/authorize.spec.ts',
      use: { ...devices['Desktop Edge'], channel: 'msedge' ,
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    /* Test against mobile viewports. */
    {
      name: 'MobileChrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
};

// set config for dev
const devConfig: TestConfig = {
  baseUrl: 'https://app.insomnia.rest',
  apiURL: 'https://api.insomnia.rest'
};

// set config for stage
const stageConfig: TestConfig = {
  baseUrl: 'https://app.insomnia.rest',
  apiURL: 'https://app.insomnia.rest'
};

// set config for prod
const prodConfig: TestConfig = {
  baseUrl: 'https://app.insomnia.rest',
  apiURL: 'https://prod.insomnia.rest'
};

// get the environment type from command line. If none, set it to dev
const environment = process.env.TEST_ENV || 'dev';

// config object with default configuration and environment specific configuration
const config: TestConfig = {
  ...defaultConfig,
  ...(environment === 'stage' ? stageConfig : environment === 'prod' ? prodConfig : devConfig)
};

export default config;