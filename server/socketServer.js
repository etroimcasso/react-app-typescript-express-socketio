"use strict";
exports.__esModule = true;
exports.serverFunction = void 0;
var _REQUEST_getTestInformation = "getTestInformation";
var _RESPONSE_getTestInformation = "return_getTestInformation";
var serverFunction = function (client) {
    var getTestInformation = function (inputString) {
        console.log("The Socket Server has been sent the string " + inputString);
        console.log("Return string to client with \"Success\" attached");
        client.emit();
    };
    client.on(_REQUEST_getTestInformation, getTestInformation);
};
exports.serverFunction = serverFunction;
