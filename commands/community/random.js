const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Generates a random number between 1 and 1000'),
    run: async (client, interaction) => {
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        await interaction.reply(`The random number is: ${randomNumber}`);
    },
}
