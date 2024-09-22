const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../index.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Gets info about a user.')
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to get the info on.")
                .setRequired(true)
        ),
    run: async (client, interaction) => {
        const member = interaction.options.getUser('user');
        const guildMember = await interaction.guild.members.fetch(member.id);

        const embed = new EmbedBuilder()
            .setTitle('<:earth:1286361875046731848> User Info')
            .setColor(color)
            .setTimestamp()
            .setThumbnail(member.displayAvatarURL())
            .addFields(
                { name: 'Username:', value: `${member.username}`, inline: true },
                { name: 'Display Name:', value: `${guildMember.displayName}`, inline: true },
                { name: 'Joined Server:', value: `${guildMember.joinedAt.toDateString()}`, inline: true },
                { name: 'Discord Join Date:', value: `${member.createdAt.toDateString()}`, inline: true },
                { name: 'User ID:', value: `${member.id}`, inline: true }
            );

        await interaction.reply({ embeds: [embed] });
    }
}
