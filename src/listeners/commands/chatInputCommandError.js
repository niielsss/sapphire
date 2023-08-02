const { Listener } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');

module.exports = class ChatInputCommandErrorListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: 'chatInputCommandError'
        });
    }

    async run(error, { interaction }) {
        const embed = new EmbedBuilder()
            .setColor('#DD2E44')
            .setTitle('Error')
            .setDescription('I received an error, and was not able to complete your command. I have notified the development team, and the issue should be fixed very soon.\n\nApologies for the inconvenience.');
        await interaction.editReply({
            embeds: [embed]
        });
    }
}