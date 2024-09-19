const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Makes the bot say the message you provide.')
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The message for the bot to repeat')
                .setRequired(true)
        ),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }
        const message = interaction.options.getString('message');
        await interaction.reply({ content: 'Message sent!', ephemeral: true });
        await interaction.channel.send(message);
        setTimeout(() => {
            interaction.deleteReply().catch(console.error);
        }, 5000); 
    },
};
