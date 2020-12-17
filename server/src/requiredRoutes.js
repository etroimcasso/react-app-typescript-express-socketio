"use strict";
exports.__esModule = true;
exports.addReactAppPath = exports.addRootFiles = exports.addStaticPath = exports.staticRoot = exports.renderRoot = exports.rootPath = void 0;
require('dotenv').config();
var express = require('express');
var path = require('path');
// Configure paths
exports.rootPath = path.join(__dirname, '../..', 'build');
var renderRoot = function (res) { return res.sendFile('index.html', { root: exports.rootPath }); };
exports.renderRoot = renderRoot;
exports.staticRoot = path.join(__dirname, '../..', 'build/static');
var addStaticPath = function (app) {
    app.use('/static', express.static(exports.staticRoot, { redirect: false }));
};
exports.addStaticPath = addStaticPath;
var addRootFiles = function (app) {
    app.get('/favicon.ico', function (_, res) { return res.sendFile(exports.rootPath + "/favicon.ico"); });
    app.get('/asset-manifest.json', function (_, res) { return res.sendFile(exports.rootPath + "/asset-manifest.json"); });
    app.get('/manifest.json', function (_, res) { return res.sendFile(exports.rootPath + "/manifest.json"); });
    if (process.env.NO_ROBOTS) {
        app.get('/robots.txt', function (req, res) { return res.sendFile(exports.rootPath + "/robots.txt"); });
    }
};
exports.addRootFiles = addRootFiles;
var addReactAppPath = function (app) {
    // Catch All (for react app)
    app.get("*", function (req, res) { return exports.renderRoot(res); });
};
exports.addReactAppPath = addReactAppPath;
