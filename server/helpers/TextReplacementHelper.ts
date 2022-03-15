export type MatchTuple = [string, string] // [0] is the template string, [1] is its replacement

//Example:
// const matchConfig = [["{food}", "tacos"]]
export function generateStringFromTemplate(template: string, matchConfig: Array<MatchTuple>): string { 
    return matchConfig.reduce((templateString, currentMatch) => 
        templateString.replace(currentMatch[0], currentMatch[1]), template)
}