const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { color } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guessthenumber")
    .setDescription("Try to guess your number between 1 and 100.")
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("Enter a number")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const number = interaction.options.getInteger("number");
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    const embed = new EmbedBuilder()
      .setTitle("<:earth:1286361875046731848> Guess The Number")
      .setColor(color)
      .setTimestamp()
      .setDescription(
        `I've generated a random number between 1 and 100. Your guess: ${number}`
      )
      .addFields({
        name: "Results:",
        value:
          randomNumber === number
            ? ":tada: Correct! You guessed it."
            : `:x: Incorrect! The correct number was ${randomNumber}.`,
      });

    await interaction.reply({ embeds: [embed] });
  },
};
