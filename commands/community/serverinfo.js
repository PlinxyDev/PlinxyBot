const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../index.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Gives info about the server.'),
    run: async (client, interaction) => {
        const { guild } = interaction;
        const embed = new EmbedBuilder()
            .setTitle('<:earth:1286361875046731848> Server Info')
            .setTimestamp()
            .setColor(color)
            .setThumbnail(guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
            .addFields(
                { name: 'Server Name:', value: `${guild.name}`, inline: true },
                { name: 'Server Membercount:', value: `${guild.memberCount}`, inline: true },
                { name: 'Server Created At:', value: `${guild.createdAt.toDateString()}`, inline: true },
                { name: 'Server Owner:', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Roles Count:', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Total Channels:', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Emoji Count:', value: `${guild.emojis.cache.size}`, inline: true },
                { name: 'Boost Count:', value: `${guild.premiumTier}`, inline: true }
            );
        await interaction.reply({embeds: [embed]})
    }
}

