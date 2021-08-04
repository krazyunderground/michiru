const Discord = require("discord.js")

module.exports = {
    name: "report",
    aliases: ['rep'],
    category: "admin",
    use: "!m report",
    description: "report a message so mods can investigate.",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        const idEmbed = new Discord.MessageEmbed()
        .setTitle("Missing Message ID")
        .setDescription("Please provide a message ID!\nFor more information, [Click Me](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)")
        .setColor("#FF9CA9")
        if(!args[0]) return message.channel.send(idEmbed)
        const reportID = (args[0])
        const reportChannel = message.channel.id
        const sendChannel = ("REPLACE ME")
        if(!sendChannel) return message.channel.send("This server doesn't have reports setup. Please contact server staff for more information.")

        const fetched = message.guild.channels.cache.get(message.channel.id).messages.fetch(reportID).then(report => {
            let authorTag = report.author.tag
            let authorID = report.author.id
            let fetchContent = report.content
            const reportEmbed = new Discord.MessageEmbed()
            .setTitle("New Report")
            .setColor("#FF9CA9")
            .setDescription(`${message.author.tag} has reported ${authorTag} (${authorID})`)
            .addFields(
                { name: "**Channel**", value: `<#${reportChannel}>`, inline: false},
                { name: "**Message ID**", value: `${reportID}`, inline: false},
                { name: "**Message**", value: `${fetchContent}`, inline: false}
            )
            sendChannel.send(reportEmbed)
        })

        message.channel.send("Report sent, thank you!")
    },
  };
  