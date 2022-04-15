module.exports.run = async (bot, message, args) => {

    return message.channel.send("hallo pikedoos");

}

module.exports.help = {
    name: "hallo",
    category: "general",
    description: "hallo"
}