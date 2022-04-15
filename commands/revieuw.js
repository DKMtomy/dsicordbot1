const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {



    const amountStars = args[0];

    if(!amountStars || amountStars < 1 || amountStars > 5 ) return message.reply("Geef het aantal sterren t.e.m 1-5");

    const messageReview = args.splice(1, args.length).join(" ") || '**Geen bericht weergegeven';

    const reviewChannel = message.member.guild.channels.cache.get("964511885502320640")

    if (!reviewChannel) return message.reply("kanaal niet gevonden")

    var stars = "";
    
    for (var i = 0; i < amountStars; i++) {

        stars += ":star: "
    }

    message.delete();
    
    const review = new discord.MessageEmbed()
    .setTitle(`${message.author.username} heeft een review geschreven! 🎉`)
    .setColor("#00ff00")
    .setThumbnail("https://cdn.discordapp.com/attachments/709308400772710450/963386929896910898/IMG_2685.png")
    .addField("Sterren:", `${stars}`)
    .addField("Review:", `${messageReview}`);

    message.channel.send("(☞ﾟヮﾟ)☞ je hebt succesvol een review geschreven!")

    return reviewChannel.send({ embeds: [review] })
}

module.exports.help = {
    name: "review",
    category: "general",
    description: "schrijf een review"
}