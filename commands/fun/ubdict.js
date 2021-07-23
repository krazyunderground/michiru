const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "ubdict",
    aliases: ['define'],
    cooldown: 2,
    description: "gets word defenition off urban dictionary",
    execute(client, message, args, Discord, economy, util){
        if(!args[1]) return message.reply("Add what you want to define from UD!")
        
        fetch(
            `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${args.slice(1).join(" ")}`,
            {
                method: "GET",
                headers: {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "a9fb0095e3msh7092e19dd0034e9p1261a5jsnb924703f4137",
                },
            })
            .then(response => response.json()) // or .text(), or .blob(), etc
            .then(result => {
                const udEmbed = new Discord.MessageEmbed()
                    .setTitle(result.list[0].word + `:`)
                    .setDescription(result.list[0].definition.replace(/\[/g, '').replace(/\]/g, ''))
                    .addField("Example:", result.list[0].example.replace(/\[/g, '').replace(/\]/g, ''))
                    .setFooter('defid: ' + result.list[0].defid)
                    .setTimestamp()
                    .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))

                message.channel.send(udEmbed)
            });
    }
}

