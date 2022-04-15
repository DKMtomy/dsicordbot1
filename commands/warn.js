const Fs = require("fs");
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("je bent geen admin")

    if (!args[0]) return message.reply("geef een member mee");

    if (!args[1]) return message.reply("geef een reden mee");

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("kan je speler niet vinden")

    if (warnUser.permissions.has("KICK_MEMBERS")) return message.reply("Je kan geen admins waarschuwen")

    const warns = JSON.parse(Fs.readFileSync("./warnings.json", "UTF8"));

    if(!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }
    warns[warnUser.id].warns++;

    var embed = new discord.MessageEmbed()
    .setColor("#ff0000")
    .setThumbnail('https://cdn.discordapp.com/attachments/709308400772710450/963386929896910898/IMG_2685.png')
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**Gewarnd:** ${warnUser.user.username} (${warnUser.id})
        **Warning door:** ${message.author}
        **Redenen: ** ${reason}`)
    .addField("Aantal warns", warns[warnUser.id].warns.toString());

 const channel = message.member.guild.channels.cache.get("964504012256870462");
 
 if(!channel) return

 channel.send({ embeds: [embed] })

 if (warns[warnUser.id].warns == 3) {
 
    var mes = new discord.MessageEmbed()
        .setDescription("PAS OP " + warnUser.user.username)
        .setColor("#ee0000")
        .addField("Bericht", "Nog één warn en je hebt een ban!!");
 
    message.channel.send({ embeds: [mes] });
 
} else if (warns[warnUser.id].warns == 4) {
 
    message.guild.members.ban(warnUser, { reason: reason });
    message.channel.send(`${warnUser} is verbannen door de bot wegens te veel warns`);
 
}

 Fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
     if (err) console.log(err);
 })
}

module.exports.help = {
    name: "warn",
    category: "general",
    description: "waarschuwt een persson"
}