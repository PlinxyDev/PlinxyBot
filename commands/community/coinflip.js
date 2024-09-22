const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flips a coin.'),
    async run(client, interaction) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('<:earth:1286361875046731848> CoinFlip')
            .setDescription(`The coin landed on: **${result}**`)
            .setTimestamp();
        await interaction.reply({ embeds: [embed] });
    },
};
