import {test as base} from '@playwright/test';
import {SignInSetup} from './signInSetup';
import config from '../../playwright.config'


export const signInTest = base.extend<{ signInSetup: SignInSetup}> ({
    signInSetup: async ({page}, use) => {
        const signInSetup = new SignInSetup(page);
        await page.goto(config.baseUrl);
        await signInSetup.signIn();
        await use(signInSetup);
        await signInSetup.logOut();
    },
});