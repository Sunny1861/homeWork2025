# Insomnia create account test
- Demo test project for interview

## Prepare
-  Make sure you already installed chome in default path C:/Program Files/Google/Chrome/Application/chrome.exe
or update 'executablePath' value to your local chome execute file path in the playwright.config.ts
-  Install Nodejs, version should >=22

## How to run it locally
- clone the code into your local, `git clone https://github.com/Sunny1861/homeWork2025.git`
- run npm install in the root of above code, `npm install`
- run `npx playwright install --with-deps` to install the browers, go to https://playwright.dev/docs/browsers to check more information about this
- run `npx playwright test --project=chromium --headed --workers 2`
- If need to see the run report after run finish, run `npx playwright show-report`

In above cmdline, --project=chromium means run chromium project(config in playwright.config.ts), --deaded means run with UI, by default it run in headless. It will run in parallel by default, you can provide command line arg '--workers num' to set the special num you want

Certain Enterprise Browser Policies may impact Playwright's ability to launch and control Google Chrome and Microsoft Edge
For more cool and power feature, you can read playwright offical site https://playwright.dev/