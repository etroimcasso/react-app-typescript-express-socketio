"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServerFunctions = void 0;
const _REQUEST_getTestInformation = "getTestInformation";
const _RESPONSE_getTestInformation = "return_getTestInformation";
const getTestInformation = (client, inputString) => {
    console.log(`The Socket Server has been sent the string ${inputString}`);
    console.log(`Return string to client with "Success" attached`);
    client.emit(_RESPONSE_getTestInformation, `SUCCESS: ${inputString}`);
};
const socketServerFunctions = (client) => {
    client.on(_REQUEST_getTestInformation, (messageText) => client.emit(_RESPONSE_getTestInformation, getTestInformation(client, messageText)));
};
exports.socketServerFunctions = socketServerFunctions;
