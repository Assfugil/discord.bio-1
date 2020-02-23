const { RichEmbed } = require("discord.js");
const { runCommand } = require("../util/packages/Functions");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  const prefixes = [`<@${client.user.id}>`, `<@!${client.user.id}>`, "!"];
  let prefix = false;
  for (const p of prefixes) message.content.startsWith(p) ? (prefix = p) : null;
  if (!prefix) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  runCommand(client, message, args);
};
