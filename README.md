# React App Skeleton w/ Typescript, Express, and Socket.io

This uses a standard .env file, with the regular ports and shit i've used.

I'm gonna be super lazy with this file, it's only for me so I don't forget stuff.

use **Yarn**

### For production:

Be sure to use the command below whenever the *server/socketServer.ts* file is changed

```
npm run compileServer
```

Then use

```
npm run production
```

**Nginx** should be used to redirect the HTTP port traffic to the HTTPS port.







## Configuring Routes[^1]

Custom routes can be configured in the **server/customRoutes.ts** file, in the ***customRoutes()*** function. Remember to run `npm run compileServer` whenever modifying this file.



[^1]: Due to the presence of a Socket.io server, custom routes will not generally be needed.


