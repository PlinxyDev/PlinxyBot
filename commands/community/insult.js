const { SlashCommandBuilder, EmbedBuilder, Message } = require("discord.js");
const { color } = require("../../index.js");

const insults = [
  "{user}, you have no life.",
  "{user}, you are a complete moron.",
  "{user}, you are a complete idiot.",
  "{user}, you suck at math.",
  "{user}, you are a complete loser.",
  "{user}, you are a complete failure.",
  "{user}, you are a complete fool.",
  "{user}, you are a complete moron.",
  "{user}, you are a complete idiot.",
  "{user}, you suck at math.",
  "{user}, you are a complete loser.",
  "{user}, you are an embarrassment.",
  "{user}, your logic is non-existent.",
  "{user}, you have the IQ of a rock.",
  "{user}, you are hopeless.",
  "{user}, your existence is pointless.",
  "{user}, you couldn’t solve a puzzle with the answer in front of you.",
  "{user}, you are a waste of space.",
  "{user}, you can’t even think straight.",
  "{user}, you fail at everything.",
  "{user}, your opinion is irrelevant.",
  "{user}, you are beyond useless.",
  "{user}, you couldn’t organize a thought if your life depended on it.",
  "{user}, even a child is smarter than you.",
  "{user}, you are the definition of ignorance.",
];

module.exports = {
    data: new SlashCommandBuilder()
      .setName("insult")
      .setDescription("Insults a user.")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The user to be insulted.")
          .setRequired(true)
      ),
    run: async (client, interaction) => {
      const user = interaction.options.getUser("user");
      const randomInsult = insults[Math.floor(Math.random() * insults.length)];
      const insultMessage = randomInsult.replace("{user}", user.toString());
      const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });
      const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`🌍 ${user.username}, You've Been Insulted!`)
        .setTimestamp()
        .setThumbnail(avatarURL)
        .setDescription(insultMessage);
  
      await interaction.reply({ content: `${user}`, embeds: [embed] });
    },
  };


