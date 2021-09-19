# React App Skeleton w/ Typescript, Express, and Socket.io

### Usage:

When working on files in the **src** directory, run the below command to build the web application:

```bash
yarn buildApp
```

### Development

If you're doing development, it is recommended to use the development server. This will automatically update with any changes you have in the *server* folder

```bash
yarn devServer
```

### Production

Be sure to use the command below whenever a **.ts file** is changed anywhere in the **server** directory. 

```bash
yarn buildServer
```

Alternatively, you can enable automatic builds using the following command. This command works as a production tool -- `git pull` on the server will cause a new build

```bash
yarn autoBuildServer
```

Then use the following command to start the pm2 process:

```bash
yarn production
```

Running this command will create a thread on all available cpu cores. You can change this by changing the value in quotes from *max* to the number of cores you would like to use. 

### Laziness

If you want to clean all build directories and delete all log files, rebuild the app and the server, and start up the production server in one command:

```bash
yarn doEverything
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
**`DATABASE_URL`**: (optional) Database connection URL

#### Choosing a Database

The file *server/prisma/schema.prisma* contains property called *provider* in the *database db* entry. Changing this value determines which database to use. The current options are:

- postgresql
- mysql

**postgresql is the default option.**

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

Custom routes can be configured in the **server/routes/routes.ts** file, in the ***customRoutes()*** function. Remember to run `yarn buildServer` whenever modifying this file.

Custom routes are generally discouraged when creating React apps, as they can conflict with React Router. However, if only backend functionality is desired, then using custom routes will not be an issue. In most situations, WebSockets are preferred.

## Configuring the Production Server 

The production server uses PM2, which will automatically restart the application if something goes wrong, and allows you to run the server on as many cores as possible. PM2 is run when using the command `yarn production`

### Options

pm2 uses the file *process.json* for the server configuration. 

- **"instances"**: can be set to *max* to utilize all cores, or set to "(number of cores)" as low as 1 

### Persistence

If you want your application to return after a reboot, start up your production server first, then run the following command:

```bash
pm2 startup
```

You will be given a command to run. Run it, then use this next command:

```bash
pm2 save
```

If you no longer want this to happen, use this command:

```bash
pm2 unstartup
```

Now your application will restart automatically when it crashes, and restart automatically when the computer reboots.
