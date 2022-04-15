const botConfig = require("../botConfig.json")

module.exports.run = async (client, message, args) => {

    try {
        
        var prefix = botConfig.prefix;
    
        var respone = "**Bot commands**\r\n\n";
        var general = "**__Algemeen__**\r\n";
        var info = "\n**__Informatie__**\r\n";
    
        client.commands.forEach(command => {
    
            switch (command.help.category) {


                case "general":
                    general += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                    break;
                case "info":
                    info += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                    break;
            }
        });
    
        respone += general + info;

        message.author.send(respone).then(() => {
            return message.reply("alle commands kun je terug vinden in je prive brichten")
        }).catch(() => {
            return message.reply("je prive brichten staan uit je hebt dus geen bricht gekregen")
        })
    } catch (error) {
        message.reply("er is iets misgegaan");
        console.log(error)
    }
}   
module.exports.help = {
    name: "help",
    category: "general",
    description: "test"
}