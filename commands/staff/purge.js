const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { color } = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purges a specified number of messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      await interaction.reply({
        content:
          "You do not have the required permissions to use this command.",
        ephemeral: true,
      });
      return;
    }
    const amount = interaction.options.getInteger("amount");
    if (amount < 1 || amount > 100) {
      const errorEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle("<:earth:1286361875046731848> Error")
        .setDescription("Please specify a number between 1 and 100.")
        .setTimestamp();

      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    try {
      const fetched = await interaction.channel.messages.fetch({
        limit: amount,
      });
      await interaction.channel.bulkDelete(fetched, true);
      const successEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle("<:earth:1286361875046731848> Purged")
        .setDescription(`Purged ${amount} messages.`)
        .setTimestamp();
      return interaction.reply({ embeds: [successEmbed], ephemeral: true });
    } catch (error) {
      console.error(error);
      const errorEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle("Error")
        .setDescription("There was an error trying to purge messages.")
        .setTimestamp();

      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};
