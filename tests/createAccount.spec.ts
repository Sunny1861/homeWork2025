import { AuthorizePage } from '../model/create-account/authorizePage.ts'
import {test, expect} from '@playwright/test'
import { delay } from '../utils/wait.ts'
import { getVerificationCode } from '../utils/receiveEmail.ts'
import config from '../playwright.config.ts';

// test('basic test', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//   // ...
// });

test.describe('authorize page test', async() => {
    test('authorize page with Email test', async ({ page}) => {
      await page.goto(config.baseUrl);
      const  authorizeP = new AuthorizePage(page);

      await authorizeP.continuewithEmail.click();
      await authorizeP.emailAddress.fill("user-564f2e71-fba7-4364-874d-dd4a543d8271@mailslurp.biz");
      await authorizeP.continuewithEmail.click();

      const verifyCode = await getVerificationCode();
      const inputs = await authorizeP.verifyCodeInput;

      for (let i = 0; i < verifyCode.length; i++) {
        await inputs.nth(i).fill(verifyCode[i]);
      }
      await delay(1000 * 10);
      await expect(authorizeP.dashboardLink).toHaveText('Dashboard');
      // ...
    });

    // test('authorize page with github test', async ({ page }) => {
    //   // ...
    // });

});

