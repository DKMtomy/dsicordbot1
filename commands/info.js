const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("een title")
    .setDescription("Een beschrijving")
    .setColor("#0099ff")
    .addField("bot naam", client.user.username)
    .setThumbnail('https://cdn.discordapp.com/attachments/709308400772710450/963386929896910898/IMG_2685.png')
    .setImage('https://cdn.discordapp.com/attachments/709308400772710450/963386929896910898/IMG_2685.png')
    .setTimestamp()
    .setFooter("footer text", 'https://cdn.discordapp.com/attachments/709308400772710450/963386929896910898/IMG_2685.png');

    return message.channel.send({ embeds: [botEmbed] })
    }

    module.exports.help = {
        name: "info",
        category: "general",
        description: "test"
    }