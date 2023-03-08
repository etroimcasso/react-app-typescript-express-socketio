require('dotenv').config()

import { checkEnvBooleanValue } from "../helpers/envFunctions";
import { defaultServerName, hasFrontendBootMessage, trueFalseEnabledDisabled, usingSocketsMessage, usingTlsMessage } from "../resources/strings";
import { hasRequiredEnvironmentVariables } from "./bootCheck";

const express = require('express')
const forceSSL = require('express-force-ssl')
const app = express()

const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const useTls = !checkEnvBooleanValue(process.env.NO_TLS)
const hasFrontend = checkEnvBooleanValue(process.env.FRONTEND)
const useSockets = checkEnvBooleanValue(process.env.SOCKETS)
const hasName = typeof(process.env.INTERNAL_SERVER_NAME) !== 'undefined' && process.env.INTERNAL_SERVER_NAME !== ''

const httpOrHttps = (isHttps: boolean) => isHttps ? "HTTPS" : "HTTP"

if (!hasRequiredEnvironmentVariables(useTls)) {
    if (process) process.exit()
}

const serverPort = useTls ? process.env.HTTPS_PORT : process.env.HTTP_PORT

const defaultKeyFileName = "server.key"
const defaultCertFileName = "server.crt"

const key_file = process.env.KEY_FILE ? (() => {
    const key = process.env.KEY_FILE
    return key!.length > 0 ? key : defaultKeyFileName 
})() : defaultKeyFileName

const cert_file = process.env.CERT_FILE ? (() => {
    const cert = process.env.CERT_FILE
    return cert!.length > 0 ? cert : defaultCertFileName 
})() : defaultCertFileName

const sslOptions = useTls ? {
	httpsPort: process.env.HTTPS_PORT,
  	key: fs.readFileSync(path.join(__dirname,`../../certs/${key_file ?? "server.key"}`)),
  	cert: fs.readFileSync(path.join(__dirname,`../../certs/${cert_file ?? "server.crt"}`)),
} : {}

export const rootPath = path.join(__dirname, '../..', 'build')
export const renderRoot = (res) => res.sendFile('index.html', { root: rootPath })
export const staticRoot = path.join(__dirname, '../..' , 'build/static')


//Configure app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

if (useTls) {
    app.set('forceSSLOptions', {
        httpsPort: process.env.HTTPS_PORT
    })
    app.use(forceSSL)
}

//#region Add static path, root file paths, custom routes, and React app routes

// Add static path
app.use('/static', express.static(staticRoot, { redirect: false }));

// Add route paths
app.get('/favicon.ico', (_, res) => res.sendFile(`${rootPath}/favicon.ico`))
app.get('/asset-manifest.json', (_, res) => res.sendFile(`${rootPath}/asset-manifest.json`))
app.get('/manifest.json', (_, res) => res.sendFile(`${rootPath}/manifest.json`))

if (process.env.NO_ROBOTS) {
    app.get('/robots.txt', (req, res) => res.sendFile(`${rootPath}/robots.txt`))
}

const publicSharePath = `${rootPath}/share`
app.get("/share/:fileName(*)", (req, res, next) => res.sendFile(path.join(publicSharePath, `${req.params.fileName}`)))

// Add custom routes
require('../routes/routes').routes(app)

// Add React app route
//! Should always be the last routes added
// Catch All (for react app)
if (hasFrontend) {
    app.get("/*", (req, res) => renderRoot(res))
}
//#endregion

// Create HTTP/S server with socketIO functionality
const server = useTls ? https.createServer(sslOptions, app) : http.createServer(app)
const socketIOServer = require('socket.io')(server)
    // Attach server functions to server
const serverFunction = useSockets ? require('../sockets/sockets').socketServerFunctions : undefined
if (useSockets) {
    socketIOServer.on('connection', serverFunction)
}

//Create HTTP server
// http.createServer(app).listen(process.env.HTTP_PORT)

const bootOptionMessages: [string, string][] = [
    [usingTlsMessage, trueFalseEnabledDisabled(useTls)],
    [usingSocketsMessage, trueFalseEnabledDisabled(useSockets)],
    [hasFrontendBootMessage, trueFalseEnabledDisabled(hasFrontend)],
]

server.listen(serverPort, () => {
	console.group(`${hasName ? process.env.INTERNAL_SERVER_NAME : defaultServerName} is serving ${httpOrHttps(useTls)} on port ${serverPort}`)
        bootOptionMessages
            .forEach((message: [string, string]) => console.log(message[0], message[1]))
    console.groupEnd()
})

if (process.send) process.send!('ready')

export {}

