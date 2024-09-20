const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { color } = require('../../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('Get a random interesting fact!'),
  run: async (client, interaction) => {
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
      const randomFact = response.data.text;

      const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle('<:earth:1266806158681833544> Did You Know?')
        .setDescription(randomFact)
        .setTimestamp()

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching the random fact:', error);
      await interaction.reply({ content: 'Oops! Something went wrong while fetching a fact. Please try again later.', ephemeral: true });
    }
  },
};
