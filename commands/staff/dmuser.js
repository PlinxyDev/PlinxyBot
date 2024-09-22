const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { color } = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription(
      "Sends a DM message to a selected user in the form of an embed"
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to send the DM to")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The message to send")
        .setRequired(true)
    ),

  run: async (client, interaction) => {
    if (!interaction.inGuild()) {
      await interaction.reply({
        content: "You can only run this command inside a server.",
        ephemeral: true,
      });
      return;
    }

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.SendMessages
      )
    ) {
      await interaction.reply({
        content:
          "You do not have the required permissions to use this command.",
        ephemeral: true,
      });
      return;
    }

    const user = interaction.options.getUser("user");
    const text = interaction.options.getString("text");

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle("<:earth:1286361875046731848> Direct Message")
      .setDescription(text)
      .setTimestamp();

    try {
      await user.send({ embeds: [embed] });
      await interaction.reply({
        content: `DM sent to ${user.tag}.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error("Error sending DM:", error);
      await interaction.reply({
        content:
          "An error occurred while sending the DM. The user may have DMs disabled or may not be reachable.",
        ephemeral: true,
      });
    }
  },
};

