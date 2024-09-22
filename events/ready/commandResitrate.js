require("colors");

const commandComparing = require("../../utils/checkCommands");
const getApplicationCommands = require("../../utils/fetchTotalApplicationCommands");
const getLocalCommands = require("../../utils/fetchLocalCommands");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client);

    // Create a Set of local command names
    const localCommandNames = new Set(
      localCommands.map((cmd) => cmd.data.name)
    );

    // Remove commands that are not present locally
    for (const command of applicationCommands.cache.values()) {
      if (!localCommandNames.has(command.name)) {
        await applicationCommands.delete(command.id);
        console.log(
          `Application command ${command.name} has been deleted.`.red
        );
      }
    }

    // Process each local command
    for (const localCommand of localCommands) {
      const { data } = localCommand;
      const {
        name: commandName,
        description: commandDescription,
        options: commandOptions,
      } = data;

      const existingCommand = applicationCommands.cache.find(
        (cmd) => cmd.name === commandName
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(
            `Application command ${commandName} has been deleted.`.red
          );
          continue;
        }

        if (commandComparing(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            name: commandName,
            description: commandDescription,
            options: commandOptions,
          });
          console.log(
            `Application command ${commandName} has been edited.`.yellow
          );
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `Application command ${commandName} has been skipped, since property "deleted" is set to "true".`
              .grey
          );
          continue;
        }

        await applicationCommands.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions,
        });
        console.log(
          `Application command ${commandName} has been registered.`.green
        );
      }
    }
  } catch (err) {
    console.log(`An error occurred! ${err}`.red);
  }
};