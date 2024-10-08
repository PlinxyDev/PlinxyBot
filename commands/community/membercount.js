const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { color } = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
      .setName("membercount")
      .setDescription("Displays the total number of members in the server."),

  run: async (client, interaction) => {
    const totalMembers = interaction.guild.memberCount;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle("<:earth:1286361875046731848> Server Member Count")
        .setDescription(`This server has **${totalMembers}** members!`)
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
