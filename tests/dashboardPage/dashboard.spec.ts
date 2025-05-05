import {SpecialTest} from '../../common/fixtures/SpecialFixture'
import {expect} from '@playwright/test'
import {TestTag} from '../../const/TestTags'
import { DashBoardPage } from '../../model/dashboard/dashboardPage'

SpecialTest.describe('Dashboard test', async ()=> {
    SpecialTest('Dashboard test', {tag:[TestTag.testLevel_sanity]}, async({specialSetup, page }) =>{
        const dashBoardPage = new DashBoardPage(page);
        
        await expect(dashBoardPage.dashboardLink).toContainText(dashBoardPage.resourceObject.Dashboard.Dashboard);
    });
})


