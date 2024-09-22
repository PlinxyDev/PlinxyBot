const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { color } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mcserverinfo")
    .setDescription("Fetches Minecraft server information")
    .addStringOption((option) =>
      option
        .setName("server")
        .setDescription("The Minecraft server IP address")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const serverIP = interaction.options.getString("server");
    const url = `https://api.mcsrvstat.us/2/${serverIP}`;

    try {
      const fetch = (await import("node-fetch")).default;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.online) {
        await interaction.reply(
          `The server \`${serverIP}\` is offline or unreachable.`
        );
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(
          `<:earth:1286361875046731848> Minecraft Server Info: ${serverIP}`
        )
        .addFields(
          { name: "IP", value: data.ip, inline: true },
          { name: "Port", value: data.port.toString(), inline: true },
          {
            name: "Online Players",
            value: data.players
              ? `${data.players.online}/${data.players.max}`
              : "N/A",
            inline: true,
          },
          { name: "Version", value: data.version || "N/A", inline: true },
          {
            name: "MOTD",
            value: data.motd ? data.motd.clean.join("\n") : "N/A",
            inline: false,
          }
        )
        .setColor(color)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "There was an error fetching the server data. Please try again later."
      );
    }
  },
};
