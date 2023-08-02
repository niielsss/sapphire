const { Listener } = require('@sapphire/framework');
const { bot_logs } = require('../lib/constants').CHANNELS;
const { EmbedBuilder } = require('discord.js');

module.exports = class ReadyListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            once: true,
            event: 'ready'
        });
    }

    async run() {
        this.container.client.logger.info(`Logged in as ${this.container.client.user.tag}!`);
        const channel = await this.container.client.channels.cache.get(bot_logs);
        if (channel) {
            const embed = new EmbedBuilder()
                .setColor('#923DB4')
                .setTitle('Bot online!')
                .setDescription(`Bot is now online and operational. Errors will be posted in here if they were to occur.`)

            channel.send({ embeds: [embed] });
        }
    }
}