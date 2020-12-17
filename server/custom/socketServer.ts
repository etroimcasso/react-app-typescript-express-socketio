const _REQUEST_getTestInformation = "getTestInformation"
const _RESPONSE_getTestInformation = "return_getTestInformation"

export const socketServerFunctions = (client) => {
    //#region Get Test Information 
    const getTestInformation = (inputString: String) => {
        console.log(`The Socket Server has been sent the string ${inputString}`)
        console.log(`Return string to client with "Success" attached`)

        client.emit(_RESPONSE_getTestInformation, `SUCCESS: ${inputString}`)
    }

    client.on(_REQUEST_getTestInformation, getTestInformation)
    //#endregion

    
}

