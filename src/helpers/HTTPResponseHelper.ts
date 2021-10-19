export enum StatusCodes {
    _100 = 100, _101 = 101, _102 = 102, _103 = 103,
    _200 = 200, _201 = 201, _202 = 202, _203 = 203, _204 = 204, _205 = 205, _206 = 206, _207 = 207, _208 = 208, _226 = 226,
    _300 = 300, _301 = 301, _302 = 302, _303 = 303, _304 = 304, _305 = 305, _307 = 307, _308 = 308,
    _400 = 400, _401 = 401, _402 = 402, _403 = 403, _404 = 404, _405 = 405, _406 = 406, _407 = 407, _408 = 408, _409 = 409, 
    _410 = 410, _411 = 411, _412 = 412, _413 = 413, _414 = 414, _415 = 415, _416 = 416, _417 = 417, _418 = 418, 
    _421 = 421, _422 = 422, _423 = 423, _424 = 424, _425 = 425, _426 = 426, _428 = 428, _429 = 429, _431 = 431, _451 = 451,
    _500 = 500, _501 = 501, _502 = 502, _503 = 503, _504 = 504, _505 = 505, _506 = 506, _507 = 507, _508 = 508, _510 = 510, _511 = 511
}

export const StatusCodeTitleMap: ReadonlyMap<StatusCodes, String> = new Map([
    // 100s
    [StatusCodes._100, "Continue"],
    [StatusCodes._101, "Switching Protocol"],
    [StatusCodes._102, "Processing (WebDAV)"],
    [StatusCodes._103, "Early Hints"],
    // 200s
    [StatusCodes._200, "OK"],
    [StatusCodes._201, "Created"],
    [StatusCodes._202, "Accepted"],
    [StatusCodes._203, "Non-Authoritative Information"],
    [StatusCodes._204, "No Content"],
    [StatusCodes._205, "Reset Content"],
    [StatusCodes._206, "Partial Content"],
    [StatusCodes._207, "Multi-Status (WebDAV)"],
    [StatusCodes._208, "Already Reported (WebDAV)"],
    [StatusCodes._226, "IM Used (HTTP Delta Encoding)"],
    // 300s
    [StatusCodes._300, "Multiple Choice"],
    [StatusCodes._301, "Moved Permanently"],
    [StatusCodes._302, "Found"],
    [StatusCodes._303, "See Other"],
    [StatusCodes._304, "Not Modified"],
    [StatusCodes._305, "Use Proxy"],
    [StatusCodes._307, "Temporary Redirect"],
    [StatusCodes._308, "Permanent Redirect"],
    // 400s
    [StatusCodes._400, "Bad Request"],
    [StatusCodes._401, "Unauthorized"],
    [StatusCodes._402, "Payment Required"],
    [StatusCodes._403, "Forbidden"],
    [StatusCodes._404, "Not Found"],
    [StatusCodes._405, "Method Not Allowed"],
    [StatusCodes._406, "Not Acceptable"],
    [StatusCodes._407, "Proxy Authentication Required"],
    [StatusCodes._408, "Request Timeout"],
    [StatusCodes._409, "Conflict"],
    [StatusCodes._410, "Gone"],
    [StatusCodes._411, "Length Required"],
    [StatusCodes._412, "Precondition Failed"],
    [StatusCodes._413, "Payload Too Large"],
    [StatusCodes._414, "URI Too Long"],
    [StatusCodes._415, "Unsupported Media Type"],
    [StatusCodes._416, "Range Not Satisfiable"],
    [StatusCodes._417, "Expectation Failed"],
    [StatusCodes._418, "I'm a teapot"],
    [StatusCodes._421, "Misdirected Request"],
    [StatusCodes._422, "Unprocessable Entity (WebDAV)"],
    [StatusCodes._423, "Locked (WebDAV)"],
    [StatusCodes._424, "Failed Dependency (WebDAV)"],
    [StatusCodes._425, "Too Early"],
    [StatusCodes._426, "Upgrade Required"],
    [StatusCodes._428, "Precondition Required"],
    [StatusCodes._429, "Too Many Requests"],
    [StatusCodes._431, "Request Header Fields Too Large"],
    [StatusCodes._451, "Unavailable for Legal Reasons"],
    // 500s
    //    _500, _501, _502, _503, _504, _505, _506, _507, _508, _510, _511
    [StatusCodes._500, "Internal Server Error"],
    [StatusCodes._501, "Not Implemented"],
    [StatusCodes._502, "Bad Gateway"],
    [StatusCodes._503, "Service Unavailable"],
    [StatusCodes._504, "Gateway Timeout"],
    [StatusCodes._505, "HTTP Version Not Supported"],
    [StatusCodes._506, "Variant Also Negotiates"],
    [StatusCodes._507, "Insufficient Storage (WebDAV)"],
    [StatusCodes._508, "Loop Detected (WebDAV)"],
    [StatusCodes._510, "Not Extended"],
    [StatusCodes._511, "Network Authentication Required"],
])
// TODO
export const respondWithStatusCode =  <T, >(res, statusCode: StatusCodes, response?: T) => 
    res.status(statusCode).send(response ?? "")

// TODO 
export const unauthorizedResponse = <T, >(res, response?: T) => 
    respondWithStatusCode(res, StatusCodes._401, response ?? "")
    // res.status(StatusCodes._401).send(message)