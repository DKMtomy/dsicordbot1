const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("serverinfo")
    .setDescription("bekijk de serverinfo")
    .setColor("#0099ff")
    .setThumbnail('https://cdn.discordapp.com/attachments/709308400772710450/963386929896910898/IMG_2685.png')
    .addFields(
        {name: "Bot naam", value:client.user.username},
        {name: "je bent de server gejoined op", value:message.member.joinedAt.toString()},
        {name: "totaal members", value: message.guild.memberCount.toString()},
        {name: "realm code", value: "6JGZh_3q8DU"}
    )
    .setFooter("citytopia", 'https://cdn.discordapp.com/attachments/709308400772710450/963386929896910898/IMG_2685.png');

    return message.channel.send({ embeds: [botEmbed] })
    }

    module.exports.help = {
        name: "serverinfo",
    category: "general",
    description: "test"
    }