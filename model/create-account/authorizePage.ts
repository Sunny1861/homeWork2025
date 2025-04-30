import {loadYamlAsMap, ConfigMap} from '../../utils/yamlLoader.ts'
import { Page } from '@playwright/test'
import {BasicPage} from '../basePage.ts'
const ymlPath = './model/create-account/authorizeConfig.yml'

export class AuthorizePage extends  BasicPage {
    constructor(page: Page) {
         
        super(page,ymlPath); // Call parent constructor

        //Todo
        // Add customized funtion of current page
    }
}