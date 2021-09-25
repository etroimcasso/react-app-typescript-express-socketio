const headerSpacer = "----------"
const itemSpacer = "---"

export enum LogMessageType {
    "error",
    "info",
    "log"
}

// const formatLogMessage = (caller, message)

const logMessageTypeToConsoleFunctionMap: ReadonlyMap<LogMessageType, (arg0: String) => void> = new Map([
        [LogMessageType.error, (message) => console.error(message)],
        [LogMessageType.info, (message) => console.info(message)],
        [LogMessageType.log, (message) => console.log(message)] 
])

export const logToConsole = (type: LogMessageType, caller: String, message: String) => {
    const logFunction: (arg0: String) => void = logMessageTypeToConsoleFunctionMap.get(type)!
    logFunction(`${new Date().toISOString()} - ${caller} ${headerSpacer}`)
    logFunction(`${itemSpacer} ${message}`)
    logFunction(`${headerSpacer}${headerSpacer}`)
}