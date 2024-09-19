const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Displays the total number of members in the server.'),
    run: async (client, interaction) => {
        const { guild } = interaction; 
        const totalMembers = guild.memberCount; 
        const memberCountEmbed = new EmbedBuilder()
            .setColor("Blurple") // Set the color of the embed
            .setTitle('<:cog:1284616671646191646> Server Member Count:')
            .setDescription(`This server has **${totalMembers}** members!`)
            .setTimestamp(); 
        await interaction.reply({ embeds: [memberCountEmbed] });
    },
};
