const { send } = require('@sapphire/plugin-editable-commands');
const { EmbedBuilder } = require('discord.js');

function sendLoadingMessage(message) {
    return send(message, {
        embeds: [
            new EmbedBuilder()
                .setTitle('Loading...')
                .setColor('#FF0000')
        ]
    });
}

function replyLoadingMessage(interaction) {
    return interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle('Loading...')
                .setColor('#FF0000')
        ],
        ephemeral: true
    });
}

function sendErrorMessage(title, description) {
    return send(message, {
        embeds: [
            new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor('#FF0000')
        ]
    });
}

module.exports = {
    sendLoadingMessage,
    replyLoadingMessage
};