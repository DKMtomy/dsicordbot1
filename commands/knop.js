const { MessageActionRow, MessageButton } = require("discord.js");
module.exports.run = async (bot, message, args) => {


    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
                
                new MessageButton()
                .setCustomId('grijs')
                .setLabel('grijs')
                .setStyle('SECONDARY'),

                new MessageButton()
                .setCustomId('groen')
                .setLabel('groen')
                .setStyle('SUCCESS'),

                new MessageButton()
                .setCustomId('rood')
                .setLabel('rood')
                .setStyle('DANGER'),
                
                new MessageButton()
                .setLabel('link')
                .setStyle('LINK')
                .setURL('https://nl.pornhub.com/')

        );
        const rowSecond = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('emoji')
                .setLabel('emoji')
                .setStyle('SUCCESS')
                .setEmoji('😘')

        );

    message.channel.send({ content: 'Pong!', components: [row, rowSecond] });
}

module.exports.help = {
    name: "knop",
    category: "general",
    description: "knop"
}