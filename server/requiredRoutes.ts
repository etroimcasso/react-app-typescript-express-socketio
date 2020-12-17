require('dotenv').config()

const express = require('express')
const path = require('path')

// Configure paths
export const rootPath = path.join(__dirname, '..', 'build')
export const renderRoot = (res) => res.sendFile('index.html', { root: rootPath })

export const addStaticPath = (app: any) => {
    const staticRoot = path.join(__dirname, '..', 'build/static')
    app.use('/static', express.static(staticRoot, { redirect: false }));
}

export const addRootFiles = (app: any) => {
    app.get('/favicon.ico', (_, res) => res.sendFile(`${rootPath}/favicon.ico`))
    app.get('/asset-manifest.json', (_, res) => res.sendFile(`${rootPath}/asset-manifest.json`))
    app.get('/manifest.json', (_, res) => res.sendFile(`${rootPath}/manifest.json`))

    if (process.env.NO_ROBOTS) {
        app.get('/robots.txt', (req, res) => res.sendFile(`${rootPath}/robots.txt`))
    }
}

export const addReactAppPath = (app: any) => {
    // Catch All (for react app)
    app.get("*", (req, res) => renderRoot(res))
}