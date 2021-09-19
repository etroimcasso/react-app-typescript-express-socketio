const express = require('express')
const path = require('path')

// App's build location. Use to locate files on the client side
const rootPath = require('../bin/www').rootPath

export const routes = (app: any) => {
    app.get('/test', (req, res) => {
        res.send(`App build directory is: ${rootPath}`)
    })
}

