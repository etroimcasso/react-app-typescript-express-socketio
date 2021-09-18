"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactAppPath = exports.addRootFiles = exports.addStaticPath = exports.staticRoot = exports.renderRoot = exports.rootPath = void 0;
require('dotenv').config();
const express = require('express');
const path = require('path');
exports.rootPath = path.join(__dirname, '../..', 'build');
const renderRoot = (res) => res.sendFile('index.html', { root: exports.rootPath });
exports.renderRoot = renderRoot;
exports.staticRoot = path.join(__dirname, '../..', 'build/static');
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
