// App's build location. Use to locate files on the client side
import { asyncRoute } from "../../helpers/AsyncRouteHelper"
import { buildPath } from "../../helpers/PathHelper"
import { checkForRequiredParameters } from "../../helpers/RouteHelper"
import { WebPathHelper } from "../../helpers/WebPathHelper"

const express = require('express')
const path = require('path')

const routeRoot: string = "/admin"
const wph: WebPathHelper = WebPathHelper(routeRoot)

export const routes = (app: any) => {
    // GET: Login
    app.get(wph.path("login"), asyncRoute((req, res) => {

        
    }))

    // POST: Login
    app.post(wph.path("login"), asyncRoute((req, res) => {

    }))
}

