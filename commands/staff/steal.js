const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steal')
        .setDescription('Steal an emoji from another server using its emoji ID or URL and add it to this server.')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji you want to steal (URL or custom emoji from another server).')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the emoji to be added to this server.')
                .setRequired(true)),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true });
        }
        const emoji = interaction.options.getString('emoji');
        const emojiName = interaction.options.getString('name');

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) {
            return interaction.reply({ content: "I don't have permission to manage emojis!", ephemeral: true });
        }
        const emojiRegex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/;
        let emojiUrl;

        if (emojiRegex.test(emoji)) {
            const [, , , emojiId] = emoji.match(emojiRegex);
            emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.png`;
        } else {
            emojiUrl = emoji; 
        }
        try {
            const newEmoji = await interaction.guild.emojis.create({
                attachment: emojiUrl,
                name: emojiName
            });
            return interaction.reply({ content: `Successfully added the emoji: ${newEmoji}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Failed to add the emoji. Make sure the emoji is valid or the URL is correct.', ephemeral: true });
        }
    }
};
