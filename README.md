# PlinxyBot 💻

**PlinxyBot** is an open-source and public Discord bot that anyone can use and customize. It’s a great starting point for developers looking to build their own Discord bots. Whether you’re new to bot development or experienced, PlinxyBot offers a solid foundation to help you get started quickly.

## 📱 Visit this Project

- [GitHub Repository](https://github.com/PlinxyDev/PlinxyBot)

## 💻 Technologies

This project was built using the following technologies:

- **JavaScript**: The core programming language used for building the bot.
- **Discord.js**: A powerful Node.js module that allows interaction with the Discord API.
- **Luxon**: A library for handling dates and times, making it easy to manage time zones and scheduling.

## 🚀 Getting Started

PlinxyBot is designed to be easy to set up and run locally. Follow these steps to get started on your own Discord bot journey.

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- **Git**: You can download Git from [git-scm.com](https://git-scm.com/).
- **A Discord Bot Token**: You’ll need a bot token from the Discord Developer Portal. If you don’t have one, follow [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to create a bot and get a token.

### Cloning the Repository

Start by cloning the PlinxyBot repository from GitHub. This will give you access to all the necessary files and folders.

```bash
git clone https://github.com/PlinxyDev/PlinxyBot
```

Navigate into the project directory:

```bash
cd PlinxyBot
```

### Installing Dependencies

Now, you’ll need to install the required packages for the bot to function. Run the following commands to install `discord.js` and `luxon`:

```bash
npm install discord.js
npm install luxon
npm install quick.db
npm install better-sqlite3
npm install dotenv
```

This will ensure all necessary dependencies are installed.

### Setting Up the Bot

Before you can run the bot, make sure to add your Discord bot token to the configuration file.

1. Locate the `.env` file.
2. Add your Discord bot token in the code:
3. replace `your_bot_token_here` with the actual token from the Discord Developer Portal.

### Running the Bot

Once the configuration is complete, you can start the bot by running:

```bash
node index.js
```

If everything is set up correctly, you should see the bot go online in your Discord server!

### Troubleshooting

If you encounter any issues, make sure to check:

- The Node.js and npm versions (use `node -v` and `npm -v` to verify).
- The bot permissions in the Discord Developer Portal.

Now you're all set to start using and developing PlinxyBot!

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thanks for checking out **PlinxyBot**! We hope this helps you get started with your own Discord bot journey.
