# Discord Bot Template

This is a template for me to use for when I am creating a discord bot.

## Features

- Easy to implement new commands
- Admin role for bot to use bot specific commands whilst not giving "ADMINISTRATOR" permissions
- Config implementation
- Logger implementation
- Dockerised

## Docker Instructions

**Flags**

- Set detached from foreground
- Set logging path (Unix Path is used. Change if host is windows)
- Limit memory to 2GBs
- Set tag for container

```
docker build -t <image-name> .
docker run -d -v /var/log/<create folder for logs>/:/usr/src/app/logs/ -m 2 --name <name for container> <image-name>

E.g.
docker build -t mc-server-bot-image .
docker run -d -v /var/log/bot-test/:/usr/src/app/logs/ -m 2g --name bot-test bot-test
```

## .env file

*Copy the .env.sample file*

* -> Required

- PROD_BOT_TOKEN*
    - Discord bot token for production environment
- DEV_BOT_TOKEN
    - Discord bot token for development environment
- BOT_PREFIX*
    - Prefix for bot commands
- LOG_DIR*
    - Directory path for logs
- ADMIN_ROLE_NAME*
    - Name of admin role for the bot

## Creating commands

Create a command file in the intended folder (general/admin)

**/commands/general/example.js**

```javascript
const config = require("../../utils/config");

module.exports = {
    name: "example",
    description: "Example command",
    admin: false,
    usage: `${config.PREFIX}example`,
    execute(msg, args) {
        msg.reply("You executed the example command!");
    },
};
```

Add command to "index.js" for the respective folder

**/commands/general/index.js**

```javascript
module.exports = {
    ping: require("./ping"),
    whoami: require("./whoami"),
    example: require("./example")
};
```

And that's it!
