const { RichEmbed } = require("discord.js");
const { fuzzy } = require("../util/packages/Functions")
const { Colors } = require("../config");
const Bio = require("discord.bio");
const bio = new Bio();

module.exports.run = async function (client, message, args) {
	let target = message.guild.members.find(m => fuzzy(args[0], m.user.tag.toLowerCase() + "~>" + m.id)) || message.member;

	let tBio = await bio.fetchUserDetails(target.id);
	if (!tBio) return message.channel.send("It seems that you or the targeted user do not yet have a profile. Sign up and get your own at https://discord.bio");
	let targetBio = tBio.settings;

	let tconnections = await bio.fetchUserConnections(target.id);
	let targetConnections = tConnections.settings;

	let slug = `[${targetBio.name}](https://dsc.bio/${targetBio.name}/)`
	if (targetBio.verified === true) {
		slug =+ " <:booleanverified:680217203014238279>"
	};

	const embed = new RichEmbed()
		.setTitle(`${target.tag}'s Profile`)
		.setColor(Colors.DEFAULT)
		.addField("Slug", slug, true)
		.addField("Details", `**Status:** ${targetBio.status || "None Provided"}\n**Description:** ${targetBio.description || "None Provided"}\n**Location:** ${targetBio.upvotes || "None Provided"}\n**Gender:** ${targetBio.gender || "None Provided"}\n**Birthday:** ${targetBio.birthday || "None Provided"}\n**Occupation:** ${targetBio.occupation || "None Provided"}\n**Email:** ${targetBio.email || "None Provided"}\n**Website:** ${targetBio.website || "None Provided"}`)
		.addField("Statistics", `**Upvotes:** ${targetBio.upvotes}\n**View Count:** Unavailable`)
		.addField("Connections", `Soon`)
		.setFooter("Don't have a bio yet? Sign up at https://discord.bio/");

	message.channel.send(embed);
};

module.exports.data = {
	name: "bio",
	aliases: ["profile"],
};
