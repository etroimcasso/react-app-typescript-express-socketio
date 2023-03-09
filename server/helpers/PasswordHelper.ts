// TODO -- hash & salt password.

import { ErrorCheckTuple } from "../model/ErrorCheck"
import { andReduction, orReduction } from "./ArrayFunctions"
import { errorCheckTupleToBooleanArray, 
    generateStringFromErrorCheckTupleArray, 
    getErrorsFromErrorCheckTupleArray 
} from "./ErrorCheckHelper"

const bcrypt = require('bcrypt');

const saltRounds = 8;

// isNakama is so specific nakama password formatting can be used
export const saltAndHashPassword = (password: string): Promise<string> => {
    const passwordErrorStates: ErrorCheckTuple[] = [
        [password.length <= 0 || password === "", "Password is too short"]
    ]

    const invalidPassword = orReduction(errorCheckTupleToBooleanArray(passwordErrorStates))

    if (invalidPassword) {
        const justErrors: ErrorCheckTuple[] = getErrorsFromErrorCheckTupleArray(passwordErrorStates)
        const errorString = generateStringFromErrorCheckTupleArray(justErrors)

        return new Promise((_, reject) => reject(errorString))
    }

    // TODO -- salt and hash this first
    // const newPassword: string = isNakama ? "" : ""
    const newPassword: string = bcrypt.hashSync(password, saltRounds)

    return new Promise((resolve, _) => resolve(newPassword))
}
