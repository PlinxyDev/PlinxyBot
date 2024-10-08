const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionsBitField,
  } = require("discord.js");
  const { color } = require("../../index.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("removeroleall")
      .setDescription("Removes a specified role from all members in the server.")
      .addRoleOption((option) =>
        option
          .setName("role")
          .setDescription("The role to remove from all members")
          .setRequired(true)
      ),
    run: async (client, interaction) => {
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({ content: "You do not have the required permissions to use this command.", ephemeral: true });
      }
  
      const role = interaction.options.getRole("role");
      const embed = new EmbedBuilder()
        .setTitle("<:earth:1286361875046731848> Remove All Role Confirmation")
        .setDescription(`Are you sure you want to remove the role **${role.name}** from all members?`)
        .setTimestamp()
        .setColor(color);
  
      const confirmButton = new ButtonBuilder()
        .setCustomId("confirm_role_removal")
        .setLabel("Confirm")
        .setEmoji("<:zap:1286361918763700235>")
        .setStyle(ButtonStyle.Secondary);
  
      const row = new ActionRowBuilder().addComponents(confirmButton);
      const confirmationMessage = await interaction.reply({
        embeds: [embed],
        components: [row],
        fetchReply: true,
      });
  
      const filter = (i) => i.customId === "confirm_role_removal" && i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
  
      collector.on("collect", async (i) => {
        await i.deferUpdate();
  
        try {
          const members = await interaction.guild.members.fetch();
          let successCount = 0;
          let failCount = 0;
  
          for (const member of members.values()) {
            if (member.roles.cache.has(role.id)) {
              try {
                await member.roles.remove(role);
                successCount++;
              } catch (error) {
                failCount++;
              }
            }
          }
  
          const resultEmbed = new EmbedBuilder()
            .setTitle("<:earth:1286361875046731848> Remove All Role Complete")
            .setDescription(`Successfully removed **${role.name}** from ${successCount} members. Failed for ${failCount} members.`)
            .setTimestamp()
            .setColor(color);
  
          await confirmationMessage.delete();
          await i.followUp({ embeds: [resultEmbed] });
        } catch (error) {
          const errorEmbed = new EmbedBuilder()
            .setTitle("<:earth:1286361875046731848> Remove All Role Error")
            .setDescription(`There was an error trying to remove the role: ${error.message}`)
            .setTimestamp()
            .setColor(color);
  
          await confirmationMessage.delete();
          await i.followUp({ embeds: [errorEmbed], ephemeral: true });
        }
  
        collector.stop();
      });
  
      collector.on("end", (collected) => {
        if (collected.size === 0) {
          interaction.followUp({ content: "Confirmation timed out.", ephemeral: true });
        } else {
          confirmationMessage.delete();
        }
      });
    },
  };
  