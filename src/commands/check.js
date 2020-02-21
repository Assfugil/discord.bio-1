const { RichEmbed } = require("discord.js");
const { fuzzy } = require("../util/packages/Functions")
const { Colors } = require("../config");
const Bio = require("discord.bio");
const bio = new Bio();

module.exports.run = async function (client, message, args) {
	let target = args[0];
	if (!target) return message.channel.send("You must provide a slug to check.")
	let tBio = await bio.fetchUserDetails(target);

	if (!tBio.success === 1) return message.channel.send(new RichEmbed().setDescription("<:available:680486631484162056> The provided slug is **available**."));
	return message.channel.send(new RichEmbed().setDescription("<:taken:680486604711788577> The provided slug is **taken**.");
};

module.exports.data = {
	name: "check",
	aliases: null,
};
