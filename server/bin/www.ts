require('dotenv').config()

const express = require('express')
const forceSSL = require('express-force-ssl')
const app = express()

const path = require('path');
const fs = require('fs');
// const http = require('http');
const https = require('https');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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

const sslOptions = {
	httpsPort: process.env.HTTPS_PORT,
  	key: fs.readFileSync(path.join(__dirname,`../../certs/${key_file ?? "server.key"}`)),
  	cert: fs.readFileSync(path.join(__dirname,`../../certs/${cert_file ?? "server.crt"}`)),
}

export const rootPath = path.join(__dirname, '../..', 'build')
export const renderRoot = (res) => res.sendFile('index.html', { root: rootPath })
export const staticRoot = path.join(__dirname, '../..' , 'build/static')


//Configure app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

app.set('forceSSLOptions', {
    httpsPort: process.env.HTTPS_PORT
})
app.use(forceSSL)

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

// Add custom routes
require('../routes/routes').customRoutes(app)
// addCustomRoutes(app, express)

// Add React app route
//! Should always be the last routes added
// Catch All (for react app)
app.get("/*", (req, res) => renderRoot(res))
//#endregion

// Create HTTP/S server with socketIO functionality
const server = https.createServer(sslOptions, app)
const socketIOServer = require('socket.io')(server)
    // Attach server functions to server
const serverFunction = require('../sockets/socketServer').socketServerFunctions
socketIOServer.on('connection', serverFunction)
    //Create HTTP server
// http.createServer(app).listen(process.env.HTTP_PORT)
server.listen(process.env.HTTPS_PORT,() => {
	console.log(`Serving ${process.env.INTERNAL_SERVER_NAME} on port ${process.env.HTTPS_PORT}`)
})

export {}

