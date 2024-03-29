const { Client, Intents, Message, Collection } = require("discord.js");
const botConfig = require("./botConfig.json");
const SwearWords = require("./data/SwearWords.json")
const fs = require("fs");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});


client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`De file ${command.help.name}.js is geladen`);
}

client.once("ready", () => {
    console.log(`${client.user.username} is online.`)
    client.user.setActivity("citytopia de beste minetopia in de benlux", { type: "PLAYING" })
});

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) {

            var msg = message.content.toLocaleLowerCase();

            for (let index = 0; index < SwearWords.length; index++) {
                const SwearWord = SwearWords[index];
                
                if(msg.includes(SwearWord.toLocaleLowerCase())){

                    message.delete();
                    return await message.channel.send("Je mag niet vloeken").then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 3000);
                    })

                }

            }


    } else {
        const commandData = client.commands.get(command.slice(prefix.length))

        if (!commandData) return

        var arguments = messageArray.slice(1);

        try {

            await commandData.run(client, message, arguments);

        } catch (error) {
            console.log(error);
            await message.reply("Er was een probleem tijdens het uitvoeren van deze command.")
        }
    }
})

client.login(botConfig.token);