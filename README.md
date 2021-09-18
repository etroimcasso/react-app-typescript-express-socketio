# React App Skeleton w/ Typescript, Express, and Socket.io

This uses a standard .env file, with the regular ports and configuration details I've used in the past

### For production:

Be sure to use the command below whenever a **.ts file** is changed anywhere in the **server** directory

```
yarn buildServer
```

When working on files in the **src** directory, run the below command to build the web application

```
yarn buildApp
```

Then use

```
yarn production
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
**`NO_ROBOTS`**: Enables (`true`) or disables(`false`) *robots.txt*.

------

### Configuring SSL Options

The SSL certificate files go in the `certs` folder.  

>key: server.key  
>certificate: server.crt  

#### SSL with Let's Encrypt

The Let's Encrypt tool will generate a number of files, but the important ones are:

>`privkey.pem` - rename to `server.key`  
>`fullchain.pem` - rename to `server.crt

------

### **Configuring Routes**

Custom routes can be configured in the **server/custom/customRoutes.ts** file, in the ***customRoutes()*** function. Remember to run `yarn buildServer` whenever modifying this file.


