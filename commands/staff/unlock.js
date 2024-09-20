const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionsBitField,
  } = require("discord.js");
  const { color } = require("../../index.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("unlock")
      .setDescription("Unlocks the current channel so anyone can talk."),
  
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({
              content: 'You do not have the required permissions to use this command.',
              ephemeral: true,
            });
            return;
          }
      const embed = new EmbedBuilder();
      const channel = interaction.channel;
  
      try {
        await channel.permissionOverwrites.edit(
          interaction.guild.roles.everyone,
          {
            [PermissionsBitField.Flags.SendMessages]: true,
          }
        );
  
        embed
          .setTitle("<:earth:1286361875046731848> Channel Unlocked")
          .setDescription("This channel has been unlocked by a staff member.")
          .setTimestamp()
          .setColor(color);
  
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error(error);
        interaction.reply({
          content: "An error occurred while trying to lock the channel.",
          ephemeral: true,
        });
      }
    },
  };
  