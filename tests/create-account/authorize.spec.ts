import { AuthorizePage } from '../../model/create-account/authorizePage.ts'
import { test, expect } from '@playwright/test'
import { wait } from '../../utils/wait.ts'
import { TestTag } from '../../const/TestTags.ts';
import { MailOperation } from '../../utils/receiveEmail.ts'
import config from '../../playwright.config.ts';


test.describe('authorize page test', async () => {
  test('authorize page with Email test', { tag: [TestTag.test_positive, TestTag.testLevel_sanity] }, async ({ page }) => {
    // Set timeout to 120 seconds, wait the mail validation code will take much time
    test.setTimeout(120000);
    const mailOperate = new MailOperation();
    await mailOperate.emptyInbox();

    await page.goto(config.baseUrl);
    const authorizeP = new AuthorizePage(page);

    await authorizeP.continuewithEmail.click();
    await authorizeP.emailAddress.fill("user-564f2e71-fba7-4364-874d-dd4a543d8271@mailslurp.biz");
    await authorizeP.continuewithEmail.click();

    const verifyCode = await mailOperate.getVerificationCode();
    const inputs = await authorizeP.verifyCodeInput;

    for (let i = 0; i < verifyCode.length; i++) {
      await inputs.nth(i).fill(verifyCode[i]);
    }

    await authorizeP.dashboardLink.waitFor()
    await expect(authorizeP.dashboardLink).toHaveText(authorizeP.resourceObject.Dashboard.Dashboard);
  });

  test('authorize page with invalid Email address test', { tag: TestTag.test_negative }, async ({ page }) => {
    await page.goto(config.baseUrl);
    const authorizeP = new AuthorizePage(page);

    await authorizeP.continuewithEmail.click();
    await authorizeP.emailAddress.fill("Iamemailaddress");
    await authorizeP.continuewithEmail.click();

    await expect(authorizeP.emailAddress).toBeFocused();
  });

});

