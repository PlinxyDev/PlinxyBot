const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { color } = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removewarn')
    .setDescription('Remove a warning from a user')
    .addUserOption(option => 
        option.setName('target')
            .setDescription('User to remove a warning from')
            .setRequired(true)
    )
    .addIntegerOption(option => 
        option.setName('index')
            .setDescription('The index of the warning to remove')
            .setRequired(true)
    ),

  run: async (client, interaction) => {
    const target = interaction.options.getUser('target');
    const index = interaction.options.getInteger('index') - 1;

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply({ content: 'You need admin permissions to use this command.', ephemeral: true });
    }

    let warnings = await db.get(`warnings_${target.id}`) || [];

    if (index < 0 || index >= warnings.length) {
      return interaction.reply({ content: 'Invalid warning index.', ephemeral: true });
    }

    warnings.splice(index, 1);
    await db.set(`warnings_${target.id}`, warnings);

    const removeWarnEmbed = new EmbedBuilder()
      .setTitle('<:earth:1266806158681833544> Warning Removed')
      .setDescription(`A warning has been removed from ${target.tag}.`)
      .addFields(
        { name: 'Remaining Warnings', value: `${warnings.length}` }
      )
      .setColor(color)
      .setTimestamp();

    interaction.reply({ embeds: [removeWarnEmbed] });
  },
};
