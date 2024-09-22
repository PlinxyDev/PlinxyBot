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

PermissionsBitField.Flags.Administrator = undefined;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("View a user's warnings")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User to check warnings for")
        .setRequired(true)
    ),

  run: async (client, interaction) => {
    const target = interaction.options.getUser("target");

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

    if (warnings.length === 0) {
      return interaction.reply({
        content: `${target.tag} has no warnings.`,
        ephemeral: true,
      });
    }

    const warnEmbed = new EmbedBuilder()
      .setTitle(`<:earth:1286361875046731848> ${target.tag}'s Warnings`)
      .setDescription(`Here are the warnings for ${target.tag}:`)
      .setColor(color)
      .setTimestamp();

    warnings.forEach((warning, index) => {
      warnEmbed.addFields({
        name: `Warning ${index + 1}`,
        value: `**Reason:** ${warning.reason}\n**Date:** ${warning.date}\n**Warned By:** ${warning.warnedBy}`,
        inline: false,
      });
    });

    interaction.reply({ embeds: [warnEmbed] });
  },
};
