const { PaginatedMessage } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            description: 'Shows a paginated message.',
            detailedDescription: 'Shows a paginated message.',
            aliases: ['pm']
        });
    }

    // Slash command
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('paginated-message').setDescription('Send a paginated message!')
        );
    }

    async chatInputRun(interaction) {
        const paginatedMessage = this.createPaginatedMessage();

        await paginatedMessage.run(interaction, interaction.user);
    }

    createPaginatedMessage() {
        const paginatedMessage = new PaginatedMessage({
            template: new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Paginated Message')
                .setDescription('This is a paginated message!')
        });

        paginatedMessage
            .addPageEmbed((embed) =>
                embed
                    .setTitle('Page 1')
                    .setDescription('This is the first page!')
            )
            .addPageEmbed((embed) =>
                embed
                    .setTitle('Page 2')
                    .setDescription('This is the second page!')
            );

        return paginatedMessage;
    }


}

module.exports = UserCommand;