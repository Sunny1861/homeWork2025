import { loadYamlAsMap, ConfigMap } from '../utils/yamlLoader.ts'
import { Page } from '@playwright/test'
import { LoadJsonFile } from '../utils/JsonLoader.ts'

// This file should be copied dynamically before test started according to config
const resourceJsonPath = './common/resource/UIString.json'
const globalizationStrPrefix = 'GGGGGG|'
const globalizationStrSurfix = '|GGGGGG'
const cssPrefix = 'css:'
const textPrefix = 'text:'
const testIdPrefix = 'testId';
// common page for all pages if no need to add customized functions
export class BasicPage {
    resourceObject: any;
    constructor(page: Page, ymlPath: string) {
        const eleMap = loadYamlAsMap(ymlPath)

        // load elements dynamically by selector types
        for (const key in eleMap) {
            Object.defineProperty(this, key, {
                get: function () {
                    if (eleMap[key].startsWith(cssPrefix)) {
                        const selector = "css=" + this.getGlobalizationStr(eleMap[key].substring(cssPrefix.length));
                        // console.debug(selector);
                        return page.locator(selector);
                    } else if (eleMap[key].startsWith(textPrefix)) {
                        const selector = this.getGlobalizationStr(eleMap[key].substring(textPrefix.length));
                        // console.debug(selector)
                        return page.getByText(selector);
                    } else if (eleMap[key].startsWith(testIdPrefix)) {
                        const selector = this.getGlobalizationStr(eleMap[key].substring(testIdPrefix.length));
                        // console.debug(selector)
                        return page.getByTestId(selector);
                    } else {
                        return page.locator(this.getGlobalizationStr(eleMap[key]));
                    }
                }
            })
        }

        this.resourceObject = LoadJsonFile(resourceJsonPath);
    }

    getGlobalizationStr(str: string): string {
        const startIndex = str.indexOf(globalizationStrPrefix);
        const endIndex = str.indexOf(globalizationStrSurfix);

        if (startIndex === -1 || endIndex === -1) return str;
        const part2_t1 = str.substring(startIndex + globalizationStrPrefix.length, endIndex);

        const result = part2_t1.split('.');
        if (result.length != 2) {
            console.error("Format is incorrect for globalization string! Expect format a.b, actual not", part2_t1)
            return ""
        } else {
            const part2 = this.resourceObject[result[0]][result[1]];
            return str.substring(0, startIndex).concat(part2).concat(str.substring(endIndex + globalizationStrSurfix.length));
        }
    }
}