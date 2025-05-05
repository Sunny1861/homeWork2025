import * as fs from 'fs';
import * as yaml from 'js-yaml';

export type ConfigMap = { [key: string]: string};

export function loadYamlAsMap(filePath: string): ConfigMap {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents);
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      return data as ConfigMap;
    } else {
      throw new Error('YAML content is not a key-value map');
    }
  } catch (err) {
    console.error('Failed to load YAML:', err);
    return {};
  }
}
