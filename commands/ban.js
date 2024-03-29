const discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("je bent geen admin");

    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("ik heb geen perms");

    if (!args[0]) return message.reply("-ban <member> <reden>");

    if (!args[1]) return message.reply("-ban <member> <reden>");

    var banUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!banUser) return message.reply("kan speler niet vinden");

    if (banUser.permissions.has("KICK_MEMBERS")) return message.reply("Je kan geen admins bannen");

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Gelieven te reageren binnen 30 sec.")
        .setDescription(`Wil je ${banUser} bannen?`);

    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Gebanned:** ${banUser} (${banUser.id})
    **Gebant door:** ${message.author}
    **Redenen:** ${reason}`)
        .setFooter(message.member.displayName)
        .setTimestamp();

    message.channel.send({ embeds: [embedPrompt] }).then(async msg => {

        let authorID = message.author.id;
        let time = 30;
        let reactions = ["✅", "❌"];

        // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
        time *= 1000;

        // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
        for (const reaction of reactions) {
            await msg.react(reaction);
        }

        // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
        // dan kunnen we een bericht terug sturen.
        const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === authorID;
        };

        // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
        // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
        msg.awaitReactions({ filter, max: 1, time: time }).then(collected => {
            var emojiDetails = collected.first();

            if (emojiDetails.emoji.name === "✅") {

                msg.delete();

                banUser.ban({reason: reason}).catch(err => {
                    if (err) return message.channel.send(`Er is iets foutgegaan.`)
                });

                message.channel.send({ embeds: [embed] });

            } else if (emojiDetails.emoji.name === "❌") {

                msg.delete();

                message.channel.send(`ban geanulleerd.`).then(msg => {
                    message.delete(); 
                    setTimeout(() => msg.delete(), 5000);
                })

            }



        });
    });
}

module.exports.help = {
    name: "ban",
    category: "general",
    description: "ban een speler"
}