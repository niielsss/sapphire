const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');
const { fetch, FetchResultTypes } = require('@sapphire/fetch');
const { EMOJIS, COLOURS } = require('../../lib/constants');

class HousePointsCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            description: 'Get the current score of all the houses!',
            name: 'housepoints',
        });
    }

    // For normal command - not needed for pw
    async messageRun(message) {
        const embed = await this.getHousePoints();
        
        return message.channel.send({ embeds: [embed] });
    }

    // For slash command
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName(this.name)
                .setDescription(this.description)
        );
    }

    async chatInputRun(interaction) {
        const embed = await this.getHousePoints();

        return interaction.reply({ embeds: [embed] });
    }

    async getHousePoints() {
        const data = await fetch('https://api.potterworldmc.com/housepoints', FetchResultTypes.JSON);

        if (!data.status) {
            embed.setDescription('An error occurred while fetching the data. Please try again later.');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const housepoints = data.housepoints;

        const houses = Object.keys(housepoints).sort((a, b) => housepoints[b] - housepoints[a]);

        let description = houses.map((house) => {
            return `${EMOJIS[house]} ${house.charAt(0).toUpperCase() + house.slice(1)} - **${housepoints[house]}**`;
        }).join('\n');

        description += `\n\n${houses[0].charAt(0).toUpperCase() + houses[0].slice(1)} is currently in the lead by **${housepoints[houses[0]] - housepoints[houses[1]]}** points!`;

        const embed = new EmbedBuilder()
            .setColor(COLOURS[houses[0]])
            .setTitle('House Points')
            .setDescription(description);

        return embed;
    }
}

module.exports = HousePointsCommand;