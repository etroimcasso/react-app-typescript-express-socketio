const express = require('express')
const path = require('path')

// App's build location. Use to locate files on the client side
const rootPath = require('../src/requiredRoutes').rootPath

export const customRoutes = (app: any) => {
    // app.get('/test', (req, res) => {
    //     res.send(`${rootPath}`)
    // })
}