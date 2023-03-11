import { SocketFunctionEntry } from "../model/SocketFunctionEntry"

const _REQUEST_getTestInformation = "getTestInformation"
const _RESPONSE_getTestInformation = "return_getTestInformation"
const _RESPONSE_error = "__ERROR_RESPONSE"

const getTestInfo = async (inputString: string): Promise<string> => {
    console.log(`The Socket Server has been sent the string ${inputString}`)
    console.log(`Return string to client with "Success" attached`)

    return new Promise<string>((resolve) => resolve(`SUCCESS: ${inputString}`))
}

const getTestInfoSocket: SocketFunctionEntry = {
    request: _REQUEST_getTestInformation,
    response: _RESPONSE_getTestInformation,
    socketFunction: getTestInfo,
}

const socketFunctionsWithDefaultHandler: SocketFunctionEntry[] = [
    getTestInfoSocket,
    //! Put Default handler compatible socket functions here
]

export const socketServerFunctions = (client) => {
    const defaultErrorResponse = (error) => client.emit(_RESPONSE_error, error)
    const defaultSocketFunctionHandler = (request, response, errorResponse, socketFunction) => {
        client.on(request, async(input: any | undefined) => {
            socketFunction(input).then(
                (result) => client.emit(response, result),
                errorResponse ? errorResponse : defaultErrorResponse
            )
        })
    }

    //#region Get Test Information 
    // client.on(_REQUEST_getTestInformation, (messageText: string) => 
    //     client.emit(_RESPONSE_getTestInformation, getTestInformation(client, messageText)))
    //#endregion    

    socketFunctionsWithDefaultHandler.forEach((socketFunctionEntry: SocketFunctionEntry) => {
        const { request, response, socketFunction, errorResponse } = socketFunctionEntry
        defaultSocketFunctionHandler(request, response, errorResponse, socketFunction)
    })

    //! Custom socket endpoints go here
    
        
}

