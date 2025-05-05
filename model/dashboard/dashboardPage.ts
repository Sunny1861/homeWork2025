import {Page} from '@playwright/test'
import {BasicPage} from '../basePage'

const ymlPath = './model/dashboard/dashboardConfig.yml'

export class DashBoardPage extends BasicPage {
    constructor(page: Page) {
        super(page,ymlPath);
    }
}