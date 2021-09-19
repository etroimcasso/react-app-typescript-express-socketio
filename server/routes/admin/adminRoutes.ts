import { buildPath } from "../../helpers/PathHelper"
import { WebPathHelper } from "../../helpers/WebPathHelper"

const express = require('express')
const path = require('path')

// App's build location. Use to locate files on the client side
const routeRoot: String = "/admin"
const wph: WebPathHelper = new WebPathHelper(routeRoot)
const wp = (path: String) => wph.path(path)

export const routes = (app: any) => {
    // GET: Login
    app.get(wp("login"), (req: Express.Request, res: Express.Response) => {

    })

    // POST: Login
    app.post(wp("login"), (req: Express.Request, res: Express.Response) => {

    })
}

