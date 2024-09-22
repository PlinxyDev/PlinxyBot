const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const dotenv = require("dotenv");
dotenv.config();

const color = "#0096FF";
module.exports = { color };

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
  ],
  partials: [Partials.User, Partials.Reaction, Partials.Message],
});

client.commands = new Collection();

eventHandler(client);

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Servers plinxy is in :)");

  const uniqueInvites = new Set();

  client.guilds.cache.forEach(async (guild) => {
    try {
      const invites = await guild.invites.fetch();
      invites.forEach((invite) => {
        if (!uniqueInvites.has(invite.code)) {
          uniqueInvites.add(invite.code);
          console.log(`- ${guild.name} (ID: ${guild.id}), Invite Code: ${invite.code}`);
        }
      });
      if (invites.size === 0) {
        console.log(`- ${guild.name} (ID: ${guild.id}), No invites found.`);
      }
    } catch (error) {
      console.error(`Could not fetch invites for ${guild.name} (ID: ${guild.id}): ${error.message}`);
    }
  });
});

client.login(process.env.TOKEN).catch((error) => {
  console.error("Failed to login:", error);
});
