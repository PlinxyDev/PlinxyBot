const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of available commands with the Plinxy bot :D'),
    run: async (client, interaction) => {
        const commands = [
            { name: 'help', description: 'Shows this message.' },
            { name: 'membercount', description: 'Displays the total number of members in the server.' },
            { name: 'say', description: 'Makes the bot say the message you provide.' },
            { name: 'steal', description: 'Steal an emoji from another server using its emoji ID or URL and add it to this server.' },
            { name: 'random', description: 'Generates a random number between 1 and 1000.' },
            { name: 'randomdog', description: 'Sends an image of a dog.' },
            { name: 'plenxy', description: 'Displays information about Plenxy.' },
            { name: 'purge', description: 'Purges a specified number of messages.' },
            { name: 'dmuser', description: 'Sends a DM message to a selected user in the form of an embed.' },
            { name: 'embedbuilder', description: 'Create a custom embed.' },
            { name: 'currenttime', description: 'Displays the current date and time in the specified timezone.' },
        ];
        const helpEmbed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('<:jem:1284621547323002992> Help Commands')
            .setDescription('Here is a list of all available commands:')
            .setTimestamp();
            
        commands.forEach(cmd => {
            helpEmbed.addFields({
                name: `**/${cmd.name}**`,
                value: `> ${cmd.description}`,
                inline: false
            });
        });

        await interaction.reply({ embeds: [helpEmbed] });
    },
};
