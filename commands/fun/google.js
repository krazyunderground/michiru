const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "google",
    aliases: ['search', 'find', 'g'],
    cooldown: 2,
    description: "gets higherst google link",
    execute(client, message, args, Discord, economy, util){
        if(!args[1]) return message.reply("Add what you want to search on google!")
        fetch(
            `https://www.googleapis.com/customsearch/v1?key=AIzaSyBPWyiBgWp4M32poeGsaD7emvrsi09Oe3o&cx=89b8b878b1c574582&q=${args.slice(1).join(" ")}`,
            {
                method: "GET"
            }
        )
        .then(response => response.json()) // or .text(), or .blob(), etc
        .then(result => {
            message.channel.send(`**${result.items[0].title}:** ${result.items[0].link}`)
        });
    }
}