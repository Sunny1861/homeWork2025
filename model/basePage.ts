import {loadYamlAsMap, ConfigMap} from '../utils/yamlLoader.ts'
import { Page } from '@playwright/test'

// common page for all pages if no need to add customized functions
export class BasicPage {
    constructor(page: Page, ymlPath: string) {
        const eleMap = loadYamlAsMap(ymlPath)

        // load elements dynamically by selector types
        for(const key in eleMap) {
            Object.defineProperty(this, key, {
                get: function () {
                    if(eleMap[key].startsWith('css:')) {
                        console.log("css=" + eleMap[key].substring(4))
                        return  page.locator("css=" + eleMap[key].substring(4));
                    } else if(eleMap[key].startsWith('text:')) {
                        console.log("text=" + eleMap[key].substring(5))
                        return  page.getByText("text=" + eleMap[key].substring(5));
                    } else if(eleMap[key].startsWith('testId:')) {
                        console.log(eleMap[key].substring(6))
                        return  page.getByTestId(eleMap[key].substring(6));
                    } else {
                        return page.locator(eleMap[key]);
                    }
                }
            })
        }
    }
}