import { respondWithError } from "./HTTPResponseHelper"
import { StatusCodes } from "./HTTPResponseHelper"

export type ParameterCheckTuple = [string, boolean]

export const checkForRequiredParameters = async (res, missingParametersCheck: ParameterCheckTuple[]): Promise<boolean> => {
    const missingParameters: ParameterCheckTuple[] = missingParametersCheck.filter(item => item[1])
    if (missingParameters.length > 0) {
        const errorString = missingParameters.reduce((acc, cv, index, array) => 
            `${acc} ${cv[0]}${index == array.length - 1 ? "." : ","}`
            , `Missing propert${missingParameters.length > 1 ? "ies" : "y"}:`)

        respondWithError(res, StatusCodes._400, {
            errorCode:  "MISSING_PROPERTIES", 
            errorMessage: errorString
        })
    }
    return new Promise<boolean>((resolve, reject) => resolve(true))
}