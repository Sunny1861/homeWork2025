import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { MailOperation } from '../utils/receiveEmail.ts'
import config from '../playwright.config.ts';
import { AuthorizePage } from '../model/create-account/authorizePage.ts'

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Set timeout to 120 seconds, wait the mail validation code will take much time
  setup.setTimeout(120000);
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
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});