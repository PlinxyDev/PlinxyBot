const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('Get a random interesting fact!'),
  run: async (client, interaction) => {
    const facts = [
      "Honey never spoils.",
      "A group of flamingos is called a 'flamboyance'.",
      "Octopuses have three hearts.",
      "Bananas are berries, but strawberries aren't.",
      "The Eiffel Tower can be 15 cm taller during the summer."
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('<:earth:1266806158681833544> Did You Know?')
      .setDescription(randomFact)
      .setTimestamp()
      .setFooter({ text: 'Random Facts' });
    await interaction.reply({ embeds: [embed] });
  },
};
