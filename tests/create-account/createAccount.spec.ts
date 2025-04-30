import { AuthorizePage } from '../../model/create-account/authorizePage.ts'
import { test, expect } from '@playwright/test'
import { delay } from '../../utils/wait.ts'
import { TestTag } from '../../const/TestTags.ts';
import { getVerificationCode } from '../../utils/receiveEmail.ts'
import config from '../../playwright.config.ts';


test.describe('authorize page test', async () => {
  test('authorize page with Email test', { tag: [TestTag.test_positive, TestTag.testLevel_sanity] }, async ({ page }) => {
    await page.goto(config.baseUrl);
    const authorizeP = new AuthorizePage(page);

    await authorizeP.continuewithEmail.click();
    await authorizeP.emailAddress.fill("user-564f2e71-fba7-4364-874d-dd4a543d8271@mailslurp.biz");
    await authorizeP.continuewithEmail.click();

    // Wait 3 seconds to sure the mail server received the verify code mail
    await delay(1000 * 3);
    const verifyCode = await getVerificationCode();
    const inputs = await authorizeP.verifyCodeInput;

    for (let i = 0; i < verifyCode.length; i++) {
      await inputs.nth(i).fill(verifyCode[i]);
    }

    await authorizeP.dashboardLink.waitFor()
    await expect(authorizeP.dashboardLink).toHaveText('Dashboard');
  });

  test('authorize page with invalid Email address test', { tag: TestTag.test_negative }, async ({ page }) => {
    await page.goto(config.baseUrl);
    const authorizeP = new AuthorizePage(page);

    await authorizeP.continuewithEmail.click();
    await authorizeP.emailAddress.fill("Iamemailaddress");
    await authorizeP.continuewithEmail.click();

    await expect(authorizeP.emailAddress).toBeFocused();
  });

  // test('authorize page with github test', async ({ page }) => {
  //   // ...
  // });

});

