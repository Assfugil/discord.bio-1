const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args) => {
  const embed = new RichEmbed()
    .setTitle("Help Command")
    .setColor(Colors.DEFAULT)
    .setDescription(
      "Don't have discord.bio yet? Sign up [here](https://discord.bio)"
    )
    .addField("!help", "Sends an embed with a list of commands")
    .addField(
      "!info",
      "Sends an embed with the bot invite, repository, and stats"
    )
    .addField(
      "!bio [@user]",
      "Sends an embed with the bio of the author or the user provided"
    )
    .addField("!check [slug]", "Check if the provided slug is taken");

  message.channel.send(embed);
};

module.exports.data = {
  name: "help",
  aliases: ["commands"]
};
