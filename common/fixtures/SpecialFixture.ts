import {test as base} from '@playwright/test';
import {SpecialSetup} from './SpecialSetup';
import config from '../../playwright.config'


export const SpecialTest = base.extend<{ specialSetup: SpecialSetup}> ({
    specialSetup: async ({page}, use) => {
        const specialSetup = new SpecialSetup(page);
        await page.goto(config.baseUrl);
        await specialSetup.prepareOne();
        await use(specialSetup);
        await specialSetup.prepareTwo();
    },
});