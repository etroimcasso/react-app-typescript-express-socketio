const express = require('express')
const path = require('path')

const rootPath = require('../src/requiredRoutes').rootPath

export const customRoutes = (app: any) => {
    app.get('test', (req, res) => {
        res.send(`${rootPath}`)
    })
}