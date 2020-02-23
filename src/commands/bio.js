const { RichEmbed } = require("discord.js");
const { fuzzy } = require("../util/packages/Functions")
const { Colors } = require("../config");
const Bio = require("discord.bio");
const bio = new Bio();

module.exports.run = async function (client, message, args) {
	let target = message.mentions.users.first();
    if (!target) { target = message.author };

	let tBio = await bio.fetchUserDetails(target.id);
	if (!tBio.success) return message.channel.send("It seems that you or the targeted user do not yet have a profile. Sign up and get your own at https://discord.bio");
	let targetBio = tBio.settings;

	let tconnections = await bio.fetchUserConnections(target.id);
	let targetConnections = `GitHub: [${tconnections.github.name || "Not Linked"}](https://github.com/${tconnections.github.name}),\n Website: [${tconnections.website.name || "Not Linked"}](${tconnections.website.name}),\n Instagram: [${tconnections.instagram.name || "Not Linked"}](https://instagram.com/${tconnections.instagram.name}),\n Snapchat: ${tconnections.snapchat.name || "Not Linked"},\n LinkedIn: [${tconnections.linkedin.name || "Not Linked"}](https://linkedin.com/${tconnections.linkedin.name})`

	let slug = `[${targetBio.name}](https://dsc.bio/${targetBio.name}/)`
	if (targetBio.verified === true) {
		slug =+ " <:booleanverified:680217203014238279>"
	};

	const embed = new RichEmbed()
		.setTitle(`${target.tag}'s Profile`)
		.setColor(Colors.DEFAULT)
		.addField(":person_facepalming: User", `${slug}\n**Status:** ${targetBio.status || "None Provided"}\n**Description:** ${targetBio.description || "None Provided"}`, true)
		.addField(":information_source: Details", `**Location:** ${targetBio.upvotes || "None Provided"}\n**Gender:** ${targetBio.gender || "None Provided"}\n**Birthday:** ${targetBio.birthday || "None Provided"}\n**Occupation:** ${targetBio.occupation || "None Provided"}\n**Email:** ${targetBio.email || "None Provided"}\n**Website:** ${targetBio.website || "None Provided"}`)
		.addField("<:upvote:680483831769595961> Statistics", `**Upvotes:** ${targetBio.upvotes}\n**View Count:** Unavailable`)
		.addField("<:Link:680484762099646566> Connections", targetConnections)
		.setFooter("Don't have a bio yet? Sign up at https://discord.bio/");

	message.channel.send(embed);
};

module.exports.data = {
	name: "bio",
	aliases: ["profile"],
};
