const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { color } = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Sends an announcement in a channel.')
        .addChannelOption((option) =>
            option.setName("channel")
                .setDescription("The channel where the announcement should be sent.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("message")
                .setDescription("The message to announce.")
                .setRequired(true)
        ),
    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('<:earth:1286361875046731848> Announcement')
            .setTimestamp()
            .setDescription(interaction.options.getString('message'));

        const announcementChannel = interaction.options.getChannel('channel');
        await announcementChannel.send({ embeds: [embed] });
        await interaction.reply({ content: `Announcement sent in ${announcementChannel}.`, ephemeral: true });
    }
};
