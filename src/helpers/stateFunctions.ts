// Takes an array of number or string, and returns an object with the array items as keys with all
// keys assigned the defaultValue 

export type StateDictionary = {[key in string]: any}
export const defaultValueObjectWithIDs = <T,>(ids: string[], defaultValue: T):StateDictionary => 
    ids.reduce((allItems, currentID) => (
        {
            ...allItems,
            [currentID]: defaultValue
        }
    ), {})

export const defaultValueFromArrayObjectWithIDs = (ids: string[], defaultValues: string[] | number[] | boolean[]): StateDictionary => 
    ids.reduce((allItems, currentID, index) => (
        {
            ...allItems,
            [currentID]: defaultValues[index]
        }
    ), {})