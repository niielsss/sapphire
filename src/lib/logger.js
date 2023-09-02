const { Logger, LogLevel } = require('@sapphire/framework');
const { bot_logs } = require('./constants').CHANNELS;
const { container } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');

// Could use a lot more work
class MyLogger extends Logger {
    constructor(logLevel) {
        super(logLevel);
    }
    
    async error(...content) {
        super.error(...content);
        const channel = await container.client.channels.cache.get(bot_logs);
        const embed = new EmbedBuilder()
            .setColor('#DD2E44')
            .setTitle('Error')
            .setDescription(`${content}`);

        if (channel) {
            channel.send({ embeds: [embed] });
        }
    }
}

module.exports = MyLogger;