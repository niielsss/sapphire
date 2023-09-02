const { Listener } = require('@sapphire/framework');
const { getErrorEmbed } = require('../../lib/utils');

module.exports = class ChatInputCommandDenied extends Listener {
    run(error, { interaction }) {
        if (interaction.deferred || interaction.replied) {
            return interaction.editReply({
                embeds: [getErrorEmbed(error.message)],
            });
        }

        return interaction.reply({
            embeds: [getErrorEmbed(error.message)],
            ephemeral: true
        });
    }
}