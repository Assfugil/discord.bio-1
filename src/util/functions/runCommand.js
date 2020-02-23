const { RichEmbed } = require("discord.js");
const { Colors } = require("../../config");

module.exports = async (client, message, args) => {
  let command = args.shift().toLowerCase();

  if (!client.commands.get(command)) {
    if (!client.aliases.get(command)) return;
    command = client.aliases.get(command);
  }
  command = client.commands.get(command);

  try {
    await command.run(client, message, args);
    console.log(`Command run: ${command.data.name}`);
  } catch (err) {
    console.log(err.stack);
  }
};
