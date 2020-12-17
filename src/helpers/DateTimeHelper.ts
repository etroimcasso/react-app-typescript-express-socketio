export const minutesInDay: number = 1440
export const secondsInMinute: number = 60
export const millisecondsInSecond: number = 1000
export const millisecondsInMinute: number = millisecondsInSecond * secondsInMinute
export const millisecondsInDay: number = minutesInDay * secondsInMinute * millisecondsInSecond

export const convertUnixEpochToJavascriptDate = (epoch: Number): Date => 
    new Date(Number(epoch) * millisecondsInSecond)

export const convertJavascriptDateToUnixEpoch = (date: Date): Number =>
    Math.trunc(Number(date) / millisecondsInSecond)

export const addDaysToJavascriptDate = (date: Date, days: number): Date => 
    new Date(date.valueOf() + (millisecondsInDay * days))
