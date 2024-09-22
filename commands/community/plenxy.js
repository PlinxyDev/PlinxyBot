const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { color } = require('../../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('plinxy')
    .setDescription('Displays information about Plinxy!'),
  run: async (client, interaction) => {
    const createdAt = interaction.client.user.createdAt.toDateString();
    client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const uptime = formatUptime(process.uptime());
    
    const embed = new EmbedBuilder()
      .setTitle('<:earth:1286361875046731848> Plinxy Info!')
      .setColor(color)
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .addFields(
        { name: 'Username:', value: interaction.client.user.username, inline: false },
        { name: 'Tag:', value: interaction.client.user.tag, inline: false },
        { name: 'Servers:', value: `${client.guilds.cache.size}`, inline: false },
        { name: 'Creation Date:', value: createdAt, inline: false },
        { name: 'Uptime:', value: uptime, inline: false },
        { name: 'Support Server:', value: '[Support Server](https://discord.gg/plinxybot)', inline: false },
        { name: 'Invite Link:', value: '[Invite Me!](https://discord.com/oauth2/authorize?client_id=1284608301908103276&permissions=8&scope=bot+applications.commands)', inline: false }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours}h ${minutes}m ${secs}s`;
}
