const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const Bio = require("discord.bio");
const bio = new Bio();

module.exports.run = async function (client, message, args) {
	let target = message.mentions.users.first();
	if (!target) {
		target = message.author
	};

	let tBio = await bio.fetchUserDetails(target.id);
	let targetBio = tBio.settings;
	if (!tBio) return message.channel.send("It seems that you or the targeted user do not yet have a profile. Sign up and get your own at https://discord.bio");

	let targetConnections = await bio.fetchUserConnections(target.id);

	let connections;
	if (targetConnections.size >= 1) {
		connections = targetConnections.map(c=>c.name.toString() + ": " + (c=>c.value.toString())).join('');
	}
	else {
		connections = 'None';
	}

	let slug = `[${targetBio.name}](https://dsc.bio/${targetBio.name}/)`
	if (targetBio.verified === true) {
		slug = `[${targetBio.name}](https://dsc.bio/${targetBio.name}/) <:booleanverified:680217203014238279>`
	};

	const embed = new RichEmbed()
		.setTitle(`${target.tag}'s Profile`)
		.setColor(Colors.DEFAULT)
		.addField("Slug", slug, true)
		.addField("Details", `**Status:** ${targetBio.status || "None Provided"}\n**Description:** ${targetBio.description || "None Provided"}\n**Location:** ${targetBio.upvotes || "None Provided"}\n**Gender:** ${targetBio.gender || "None Provided"}\n**Birthday:** ${targetBio.birthday || "None Provided"}\n**Occupation:** ${targetBio.occupation || "None Provided"}\n**Email:** ${targetBio.email || "None Provided"}\n**Website:** ${targetBio.website || "None Provided"}`)
		.addField("Statistics", `**Upvotes:** ${targetBio.upvotes}\n**View Count:** Unavailable`)
		.addField("Connections", connections)
		.setFooter("Don't have a bio yet? Sign up at https://discord.bio/");

	message.channel.send(embed);
};

module.exports.data = {
	name: "bio",
	aliases: ["profile"],
};
