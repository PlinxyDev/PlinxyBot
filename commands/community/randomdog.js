const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Sends an image of a dog'),

    run: async (client, interaction) => {
        try {
            const fetch = (await import('node-fetch')).default;
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();

            const dogEmbed = new EmbedBuilder()
                .setImage(data.message)
                .setColor(color)
                .setTimestamp();

            await interaction.reply({ embeds: [dogEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Sorry, something went wrong fetching the dog image.', ephemeral: true });
        }
    },
};
