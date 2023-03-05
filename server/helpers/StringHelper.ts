export const stringEndsWithS = (testString) => {
    const finalLetter: string = (testString[testString.length - 1]).toLowerCase()
    return finalLetter === "s" 
}

export const makePlural = (text: string, quantity: number, pluralSuffix?: string, pluralWord?: string): string => {
    const isPlural: boolean = quantity > 1

    if (pluralSuffix !== undefined && pluralWord !== undefined) {
        throw new Error("Cannot have a pluralSuffix and pluralWord together")
    }

    // Not Plural
    if (!isPlural) return text

    if (pluralSuffix !== undefined) {
        if (pluralSuffix!.length > 0) {
            return `${text}${pluralSuffix}`
        }
    }

    if (pluralWord !== undefined) {
        if (pluralWord!.length > 0) {
            return `${pluralWord}`
        }
    }

    return `${text}${stringEndsWithS(text) ? 'es': 's'}`

}