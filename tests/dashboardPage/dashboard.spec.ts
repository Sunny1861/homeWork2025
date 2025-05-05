import {signInTest} from '../../common/fixtures/SignInFixture'
import {expect} from '@playwright/test'
import {TestTag} from '../../const/TestTags'
import { DashBoardPage } from '../../model/dashboard/dashboardPage'

signInTest.describe('Dashboard test', async ()=> {
    signInTest('Dashboard test', {tag:[TestTag.testLevel_sanity]}, async({signInSetup, page }) =>{
        const dashBoardPage = new DashBoardPage(page);
        
        // Fixture do a fake logon, so here just check the welcome text in stead of Dashboard
        await expect(dashBoardPage.dashboardLinkFake).toContainText(dashBoardPage.resourceObject.authorize.WelcometoInsomnia);
    });
})


