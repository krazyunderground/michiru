const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "ubdict",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/ubdict.js",
    aliases: ['define'],
    category: "fun",
    use: "ubdict",
    cooldown: 2,
    description: "gets word defenition using urban dictionary",
    async execute(client, message, args, Discord) {
        const userutil = await client.functions.get("getUserUtil").execute(message.member);

        if (!args[1]) return message.reply("Add what you want to define from UD!")
        try {
            fetch(
                    `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${args.slice(1).join(" ")}`, {
                        method: "GET",
                        headers: {
                            "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                            "x-rapidapi-key": "a9fb0095e3msh7092e19dd0034e9p1261a5jsnb924703f4137",
                        },
                    })
                .then(response => response.json())
                .then(result => {
                    const udEmbed = new Discord.MessageEmbed()
                        .setTitle(result.list[0].word + `:`)
                        .setDescription(result.list[0].definition.replace(/\[/g, '').replace(/\]/g, ''))
                        .addField("Example:", result.list[0].example.replace(/\[/g, '').replace(/\]/g, ''))
                        .setFooter('defid: ' + result.list[0].defid)
                        .setTimestamp()
                        .setColor(userutil.colour)

                    message.reply({embeds: [udEmbed]})
                }).catch((err) => message.reply("I couldn't find any suitable matches to your search!"))
        } catch (err) {
            message.reply("I couldn't find any suitable matches to your search!")
        }
    }
}