"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactAppPath = exports.addRootFiles = exports.addStaticPath = exports.staticRoot = exports.renderRoot = exports.rootPath = void 0;
require('dotenv').config();
const express = require('express');
const forceSSL = require('express-force-ssl');
const app = express();
const path = require('path');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const key_file = process.env.KEY_FILE;
const cert_file = process.env.CERT_FILE;
const sslOptions = {
    httpsPort: process.env.HTTPS_PORT,
    key: fs.readFileSync(key_file ? key_file : path.join(__dirname, `../../certs/${key_file}`)),
    cert: fs.readFileSync(cert_file ? cert_file : path.join(__dirname, `../../certs/${cert_file}`)),
};
exports.rootPath = path.join(__dirname, '../..', 'build');
const renderRoot = (res) => res.sendFile('index.html', { root: exports.rootPath });
exports.renderRoot = renderRoot;
exports.staticRoot = path.join(__dirname, '../..', 'build/static');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('forceSSLOptions', {
    httpsPort: process.env.HTTPS_PORT
});
app.use(forceSSL);
const addStaticPath = (app) => {
    app.use('/static', express.static(exports.staticRoot, { redirect: false }));
};
exports.addStaticPath = addStaticPath;
const addRootFiles = (app) => {
    app.get('/favicon.ico', (_, res) => res.sendFile(`${exports.rootPath}/favicon.ico`));
    app.get('/asset-manifest.json', (_, res) => res.sendFile(`${exports.rootPath}/asset-manifest.json`));
    app.get('/manifest.json', (_, res) => res.sendFile(`${exports.rootPath}/manifest.json`));
    if (process.env.NO_ROBOTS) {
        app.get('/robots.txt', (req, res) => res.sendFile(`${exports.rootPath}/robots.txt`));
    }
};
exports.addRootFiles = addRootFiles;
const addReactAppPath = (app) => {
    app.get("/", (req, res) => (0, exports.renderRoot)(res));
};
exports.addReactAppPath = addReactAppPath;
(0, exports.addStaticPath)(app);
(0, exports.addRootFiles)(app);
require('../routes/customRoutes').customRoutes(app);
(0, exports.addReactAppPath)(app);
const server = https.createServer(sslOptions, app);
const socketIOServer = require('socket.io')(server);
const serverFunction = require('../sockets/socketServer').socketServerFunctions;
socketIOServer.on('connection', serverFunction);
server.listen(process.env.HTTPS_PORT, () => {
    console.log(`Serving ${process.env.INTERNAL_SERVER_NAME} on port ${process.env.HTTPS_PORT}`);
});
