const { Command } = require('@sapphire/framework');
const { isMessageInstance } = require('@sapphire/discord.js-utilities');

class PingCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            description: 'Ping!',
            name: 'ping',
            preconditions: ['StaffOnly']
        });
    }

    // For normal command - not needed for pw
    async messageRun(message) {
        const msg = await message.channel.send('Pinging...');

        const content = `Pong! Latency is ${Math.round(this.container.client.ws.ping)}ms. API Latency is ${
            msg.createdTimestamp - message.createdTimestamp}ms.`;

        await msg.edit(content);
    }

    // For slash command
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('ping').setDescription('Ping the bot!')
        );
    }

    async chatInputRun(interaction) {
        const msg = await interaction.reply({ 
            content: 'Pinging...', 
            fetchReply: true, 
            ephemeral: true 
        });

        if (!isMessageInstance(msg)) {
            return interaction.editReply('Failed to retrieve ping :(')
        }

        const content = `Pong! Latency is ${Math.round(this.container.client.ws.ping)}ms. API Latency is ${
            msg.createdTimestamp - interaction.createdTimestamp}ms.`;

        return interaction.editReply(content);
    }
}

module.exports = PingCommand;