const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { QuickDB } = require("quick.db");
const path = require("path");
const fs = require("fs");
const { color } = require("../../index");

const databaseFolderPath = path.resolve(__dirname, "../../database");
if (!fs.existsSync(databaseFolderPath)) {
  fs.mkdirSync(databaseFolderPath, { recursive: true });
}

const db = new QuickDB({
  filePath: path.join(databaseFolderPath, "json.sqlite"),
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("User to warn").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the warning")
        .setRequired(false)
    ),

  run: async (client, interaction) => {
    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") || "No reason provided";

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      return interaction.reply({
        content:
          "You do not have the required permissions to use this command.",
        ephemeral: true,
      });
    }

    let warnings = (await db.get(`warnings_${target.id}`)) || [];
    const newWarning = {
      reason: reason,
      date: new Date().toLocaleString(),
      warnedBy: interaction.user.tag,
    };

    warnings.push(newWarning);
    await db.set(`warnings_${target.id}`, warnings);

    const warnEmbed = new EmbedBuilder()
      .setTitle("<:earth:1286361875046731848> User Warned")
      .setDescription(`${target.tag} has been issued a warning.`)
      .addFields(
        { name: "Reason", value: reason },
        { name: "Warned By", value: interaction.user.tag },
        { name: "Total Warnings", value: `${warnings.length}` }
      )
      .setColor(color)
      .setTimestamp();

    interaction.reply({ embeds: [warnEmbed] });
  },
};
