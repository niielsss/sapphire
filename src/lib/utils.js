const { EmbedBuilder } = require('discord.js');

function getErrorEmbed(error) {
    const embed = new EmbedBuilder()
        .setColor('#DD2E44')
        .setTitle('Error')
        .setDescription(`${error}`);
    return embed;
}

module.exports = {
    getErrorEmbed
};