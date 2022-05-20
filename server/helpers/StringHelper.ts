export const stringEndsWithS = (testString) => {
    const finalLetter = testString[testString.length - 1] 
    return finalLetter === "s" || finalLetter === "S"
}