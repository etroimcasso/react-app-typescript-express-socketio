# React App Skeleton w/ Typescript, Express, and Socket.io

This uses a standard .env file, with the regular ports and configuration details I've used in the past

### For production:

Be sure to use the command below whenever a **.ts file** is changed anywhere in the **server** directory

```
yarn run compileServer && yarn build
```

Then use

```
yarn run production
```

**Nginx** should be used to redirect the HTTP port traffic to the HTTPS port.



### Configure Project Settings

The .env file is used to configure the application's ports, email settings, and database settings. Below is a .env template

> **.env**
>
> ```
> INTERNAL_SERVER_NAME=
> HTTP_PORT=
> HTTPS_PORT=
> NO_ROBOTS=
> ```
>
> 

**`INTERNAL_SERVER_NAME`**: Used only for console logging at the moment 
**`HTTP_PORT`**: The port to serve HTTP from
**`HTTPS_PORT`**: The port to serve HTTPS from
**`NO_ROBOTS`**: Enables (`true`) or disables(`false`) *robots.txt*



### Configuring Routes[^1]

Custom routes can be configured in the **server/custom/customRoutes.ts** file, in the ***customRoutes()*** function. Remember to run `npm run compileServer` whenever modifying this file.





[^1]: Due to the presence of a Socket.io server, custom routes will not generally be needed.


