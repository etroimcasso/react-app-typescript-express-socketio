export class WebPathHelper {
    routeRoot: String

    constructor(routeRoot: String) {
        this.routeRoot = routeRoot
    }

    path(endpoint: String): String {
        return `${this.routeRoot}/${endpoint}`
    }
}