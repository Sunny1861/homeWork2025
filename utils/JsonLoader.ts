import { readFileSync } from 'fs';

export function LoadJsonFile(filePath: string) : any {
    try {
        const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));
        return jsonData;
    } catch (err) {
        console.error('Failed to load JSON:', err);
        return {};
      }
}