const { SlashCommandBuilder } = require('@discordjs/builders');
const { DateTime } = require('luxon');
const { EmbedBuilder } = require('discord.js');
const { color } = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('date')
        .setDescription('Displays the current date and time in the specified timezone.')
        .addStringOption(option =>
            option.setName('timezone')
                .setDescription('Select a timezone')
                .setRequired(false)
                .addChoices(
                    { name: 'UTC', value: 'utc' },
                    { name: 'America/New_York', value: 'America/New_York' },
                    { name: 'Europe/London', value: 'Europe/London' },
                    { name: 'Asia/Tokyo', value: 'Asia/Tokyo' },
                )),
    run: async (client, interaction) => {
        const timezone = interaction.options.getString('timezone') || 'utc';
        const now = DateTime.now().setZone(timezone);

        const formattedTime = now.toLocaleString(DateTime.DATETIME_FULL);
        const offset = now.offset / 60;
        const sign = offset >= 0 ? '+' : '-';

        const embed = new EmbedBuilder()
            .setColor(color) 
            .setTitle('<:earth:1286361875046731848> Current Date and Time')
            .addFields(
                { name: 'Timezone', value: timezone, inline: false },
                { name: 'Date and Time', value: formattedTime, inline: false },
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
