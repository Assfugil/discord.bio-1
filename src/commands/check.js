const { RichEmbed } = require("discord.js");
const { fuzzy } = require("../util/packages/Functions");
const { Colors } = require("../config");
const Bio = require("discord.bio");
const bio = new Bio();

module.exports.run = async function(client, message, args) {
  let target = args[0];
  if (!target) return message.channel.send("You must provide a slug to check.");
  let tBio = await bio.fetchUserDetails(target);
  if (!tBio.success === 1)
    return message.channel.send(
      new RichEmbed()
        .setColor(Colors.SUCCESS)
        .setTitle(
          "<:available:680486631484162056> The provided slug is **available**."
        )
    );

  let user = await client.fetchUser(tBio.settings.user_id);
  return message.channel.send(
    new RichEmbed()
      .setColor(Colors.FAILED)
      .setTitle(
        `<:taken:680486604711788577> The provided slug is **taken** by **${user.tag}**.`
      )
  );
};

module.exports.data = {
  name: "check",
  aliases: null
};
