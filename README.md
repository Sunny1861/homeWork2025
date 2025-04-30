# Insomnia create account test
- Demo test project for interview

## Prepare
-  Make sure you already installed chome in default path C:/Program Files/Google/Chrome/Application/chrome.exe
-  Install Nodejs, version should >=22

## How to run it local
- clone the code into you local
- run npm install in the root of above code
- npx playwright test --project chrome --headed
- You can see the run report after run finish, run npx playwright show-report

In above cmdline, --project=chrome means run chrome project(config in playwright.config.ts), --deaded means run with UI, by default it run in headless
For more cool and power feature, you can read playwright offical site https://playwright.dev/