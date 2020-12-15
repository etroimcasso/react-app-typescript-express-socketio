require('dotenv').config()


const express = require('express')
const forceSSL = require('express-force-ssl')
const app = express()

const path = require('path');
const fs = require('fs');
const http = require('https');
const https = require('https');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const root = require('path').join(__dirname, '..', 'build')
const staticRoot = require('path').join(__dirname, '..', 'build/static')
const renderRoot = (res) => res.sendFile('index.html', { root })

const sslOptions = {
	httpsPort: process.env.HTTPS_PORT,
  	key: fs.readFileSync(path.join(__dirname,'../certs/server.key')),
  	cert: fs.readFileSync(path.join(__dirname,'../certs/server.crt')),
}


//Configure app
// Set static path
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

app.set('forceSSLOptions', {
    httpsPort: process.env.HTTPS_PORT
})
app.use(forceSSL)

app.use('/static', express.static(staticRoot, { redirect: false }));

// GET for * -- serves React application
app.get("*", (req, res) => renderRoot(res))

// Create HTTP/S server with socketIO functionality
const server = https.createServer(sslOptions, app)
const socketIOServer = require('socket.io')(server)
    // Attach server functions to server
const serverFunction = require('./socketServer').serverFunction
socketIOServer.on('connection', serverFunction)
    //Create HTTP server
http.createServer(app).listen(process.env.HTTP_PORT)
server.listen(process.env.HTTPS_PORT,() => {
	console.log(`Serving ${process.env.INTERNAL_SERVER_NAME} on port ${process.env.HTTPS_PORT}`)
})
