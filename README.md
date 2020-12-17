# React App Skeleton w/ Typescript, Express, and Socket.io

This uses a standard .env file, with the regular ports and configuration details I've used in the past

### For production:

Be sure to use the command below whenever a **.ts file** is changed anywhere in the **server** directory

```
npm run compileServer && yarn build
```

Then use

```
npm run production
```

**Nginx** should be used to redirect the HTTP port traffic to the HTTPS port.



## Configuring Routes[^1]

Custom routes can be configured in the **server/custom/customRoutes.ts** file, in the ***customRoutes()*** function. Remember to run `npm run compileServer` whenever modifying this file.



[^1]: Due to the presence of a Socket.io server, custom routes will not generally be needed.


