import { missingConfigMessage } from "../resources/strings"

export const hasRequiredEnvironmentVariables = (useTls: boolean): boolean => {
    const requiredEnv = [
        "HTTP_PORT",
    ]

    const requiredSslEnv = [
        "HTTPS_PORT",
        "KEY_FILE",
        "CERT_FILE"
    ]

    const requiredAll = useTls ? [...requiredEnv, ...requiredSslEnv] : requiredEnv

    const envCheck: {[key: string]: boolean} = requiredAll.reduce((acc, cv) => (
        {
            ...acc,
            [cv]: typeof(process.env[cv]) !== "undefined" && process.env[cv] !== ""
        }
    ), {})

    const failedItems = Object.keys(envCheck).filter((item: string) => !envCheck[item])

    const missingRequiredSettings = failedItems.length > 0

    if (missingRequiredSettings) {
        console.group(missingConfigMessage)
            failedItems.forEach((item: string) => console.log(item))
        console.groupEnd()

        return false
    }

    return true
}
