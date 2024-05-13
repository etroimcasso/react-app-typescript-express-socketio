import { checkEnvBooleanValue } from "../helpers/envFunctions";
import { Maybe } from "../model/Maybe";

require('dotenv').config()
const cron = require('node-cron');

//@ts-ignore
const verbose: boolean = checkEnvBooleanValue(process.env.VERBOSE)

export const announceToConsole = (cronTitle, text: Maybe<string> = '') => { 
    if (verbose) {
        const noText = text.length <= 0

        const dateString = `[${new Date().toLocaleString()}]`
        const tabString = Array(dateString.length).fill(' ').join('')

        console.log(`${dateString}: [${cronTitle}]${noText ? `` : `\n${tabString}∟ ${text}`}`)
    }
}


export const skippingTaskPrefix = "Skipping task, "


export const CronTask = (cronString, cronTitle, taskFunction) => {
    const announceRun = () => announceToConsole(cronTitle,'') // '===============')//`Running Scheduled Task`)

    return {
        activate: () => cron.schedule(cronString, () => { 
            announceRun()
            taskFunction()
        }),
        withErrorHandler: (errorFunction) => ({
            activate: () => cron.schedule(cronString, () => {
                try {
                    announceRun()
                    taskFunction()
                } catch (error) {
                    errorFunction(error)
                }
            })
        })
    }
}


