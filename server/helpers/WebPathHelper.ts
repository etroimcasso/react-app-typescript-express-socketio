export type WebPathHelper = {
    path: (string) => string
}

export const WebPathHelper = (routeRoot: string): WebPathHelper => ({
    path: (endpoint: string) => `${routeRoot}${ endpoint != '/' ? `/${endpoint}` : '/'}`
})