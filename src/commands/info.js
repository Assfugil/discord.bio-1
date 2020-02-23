const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args) => {
  const embed = new RichEmbed()
    .setTitle("Info Command")
    .setColor(Colors.DEFAULT)
    .setDescription("Here is some information and stats about the bot")
    .addField(
      "Info",
      "[Bot Invite](https://discordapp.com/oauth2/authorize?client_id=680207584929775628&permissions=378944&scope=bot), [GitHub Repository](https://github.com/undecidedsource/discord.bio)"
    )
    .addField(
      "Stats",
      `**Guilds:** ${client.guilds.size}\n**Users:** ${client.users.size}`
    );

  message.channel.send(embed);
};

module.exports.data = {
  name: "info",
  aliases: ["about"]
};
