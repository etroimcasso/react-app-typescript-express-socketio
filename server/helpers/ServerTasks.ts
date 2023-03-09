require('dotenv').config()

import { checkEnvBooleanValue } from "./envFunctions"
import { cron } from 'node-cron'

const verbose = checkEnvBooleanValue(process.env.VERBOSE_TASKS)

enum TaskType {
    Repeating = "Repeating",
    Scheduled = "Scheduled"
}

const announceToConsole = (name, taskType: TaskType) => console.log(`${new Date().toLocaleString()} -- ${taskType} -- ${name}`)

export const RepeatingTask = (interval, taskName, taskFunction) => ({
    activate: () => setInterval(() => {
        if (verbose) announceToConsole(taskName, TaskType.Repeating)
        taskFunction()
    }, interval),
    withErrorHandler: (errorFunction) => ({
        activate: () => setInterval(() => {
            try {
                if (verbose) announceToConsole(taskName, TaskType.Repeating)
                taskFunction()
            }
            catch (error) {
                errorFunction(error)
            }
        }, interval)
    })
})

export const CronTask = (cronString, cronTitle, taskFunction) => ({
    activate: () => cron.schedule(cronString, () => { 
        if (verbose) announceToConsole(cronTitle, TaskType.Scheduled)
        taskFunction()
    }),
    withErrorHandler: (errorFunction) => ({
        activate: () => cron.schedule(cronString, () => {
            try {
                if (verbose) announceToConsole(cronTitle, TaskType.Scheduled)
                taskFunction()
            } catch (error) {
                errorFunction(error)
            }
        })
    })
})

