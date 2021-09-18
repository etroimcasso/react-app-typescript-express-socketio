# React App Skeleton w/ Typescript, Express, and Socket.io

This uses a standard .env file, with the regular ports and configuration details I've used in the past

### Usage:

Be sure to use the command below whenever a **.ts file** is changed anywhere in the **server** directory. 

```bash
yarn buildServer
```

Alternatively, you can enable automatic builds using the following command. This command works as both a development and production tool -- git pull will cause a new build, and any changes a developer makes will also trigger new builds

```bash
yarn autoBuildServer
```

When working on files in the **src** directory, run the below command to build the web application

```bash
yarn buildApp
```

Then use the following command to start the pm2 process. This will automatically 

```bash
yarn production
```

**Nginx** should be used to redirect the HTTP port traffic to the HTTPS port.

### Configure Project Settings

The *.env* file is used to configure the application's ports, email settings, and database settings. The file *.env.template* contains a template of the file and can be simply renamed *.env* if desired. Below is the expected format of the file: 

**`INTERNAL_SERVER_NAME`**: Used only for console logging at the moment  
**`HTTP_PORT`**: The port to serve HTTP from  
**`HTTPS_PORT`**: The port to serve HTTPS from  
**`NO_ROBOTS`**: Enables (`true`) or disables(`false`) *robots.txt*.  
**`KEY_FILE`**: Name of private key file in *certs*. If left empty, expected file is *certs/server.key*  
**`CERT_FILE`**: Name of certificate file in *certs*. If left empty, expected file is *certs/server.crt*  

------

### Configuring TLS/SSL Options

The TLS/SSL certificate files go in the `certs` folder.  

>key: server.key  
>certificate: server.crt  

#### TLS/SSL with Let's Encrypt

The Let's Encrypt tool will generate a number of files, but the important ones are:

>`privkey.pem` - `key file`  
>`fullchain.pem` -  `cert file`

------

### **Configuring Routes**

Custom routes can be configured in the **server/custom/customRoutes.ts** file, in the ***customRoutes()*** function. Remember to run `yarn buildServer` whenever modifying this file.

