const _REQUEST_getTestInformation = "getTestInformation"
const _RESPONSE_getTestInformation = "return_getTestInformation"



const getTestInformation = (client, inputString: String) => {
    console.log(`The Socket Server has been sent the string ${inputString}`)
    console.log(`Return string to client with "Success" attached`)

    client.emit(_RESPONSE_getTestInformation, `SUCCESS: ${inputString}`)
}

export const socketServerFunctions = (client) => {
    //#region Get Test Information 
    client.on(_REQUEST_getTestInformation, (messageText: String) => 
        client.emit(_RESPONSE_getTestInformation, getTestInformation(client, messageText)))
    //#endregion
    
    //! Custom socket endpoints go here
    
}

