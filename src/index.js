require('./lib/setup.js')
const { LogLevel, SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits, Partials, OAuth2Scopes } = require('discord.js');
const { discord_token, client_id, client_secret } = require('./config.json');
const Logger  = require('./lib/logger.js');

const level = process.env.NODE_ENV === 'production' ? LogLevel.Info : LogLevel.Debug;

const client = new SapphireClient({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
    ],
    logger: {
        instance: new Logger(level),
    },
    caseInsensitiveCommands: true,
    loadMessageCommandListeners: true,
    partials: [Partials.Channel],

    // For api
    auth: {
        id: client_id,
        secret: client_secret,
        cookie: 'SAPPHIRE_AUTH',
        scopes: [OAuth2Scopes.Identify],
        domainOverwrite: '127.0.0.1'
    },
    // Prefix for routes
    prefix: '',
    // CORS
    origin: '*',
    // Port
    listenOptions: {
        port: 4000,
    },
});

const main = async () => {
    try {
        await client.login(discord_token);
    }
    catch (error) {
        client.logger.fatal(error);
        client.destroy();
        process.exit(1);
    }
}

main();