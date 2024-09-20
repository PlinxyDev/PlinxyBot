const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const color = "#0096FF"
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

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Servers plinxy is in :)");
  client.guilds.cache.forEach(async guild => {
    try {
      const channels = guild.channels.cache.filter(channel =>
        channel.isTextBased() && channel.permissionsFor(guild.members.me).has('CreateInstantInvite')
      );
      if (channels.size > 0) {
        const invite = await channels.first().createInvite({ maxAge: 0, maxUses: 0 });
        console.log(`- ${guild.name} (ID: ${guild.id}, ${invite.url})`);
      } else {
        console.log(`- ${guild.name} (ID: ${guild.id}), No permission to create an invite or no text channels available.`);
      }
    } catch (error) {
      console.error(`Could not create an invite for ${guild.name} (ID: ${guild.id}): ${error.message}`);
    }
  });
});

client.login("MTI4NDYwODMwMTkwODEwMzI3Ng.GQ04XL.yHaNP8kOmjyPc5wWYBHgPdHuHRzxhQapIy9PE8");
