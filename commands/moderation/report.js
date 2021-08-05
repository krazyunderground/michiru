const Discord = require("discord.js")

module.exports = {
    name: "report",
    aliases: ['rep'],
    category: "admin",
    use: "!m report",
    description: "report a message so mods can investigate.",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        const gp = await client.functions.get("checkGuild").execute(message)
        if(!args[1]) return message.reply("You need to provide the ID of the message!\n\nIf you don't know how to get a message's ID, refer to this tutorial!\n<https://www.howtogeek.com/714348/how-to-enable-or-disable-developer-mode-on-discord/>")
        const reportID = (args[1])
        const reportChannel = message.channel.id
        if(!gp.reportChannel) return message.channel.send("Reports aren't set up for this server! Please refer to server staff for more info!")
        const sendChannel = client.channels.cache.get(gp.reportChannel)
        
        try{ 
            
            message.guild.channels.cache.get(message.channel.id).messages.fetch(reportID).then(report => {
                let repAuthor = report.author
                let authorID = report.author.id
                let fetchContent = report.content
                const reportEmbed = new Discord.MessageEmbed()
                .setTitle("New Report")
                .setColor("#FF9CA9")
                .setDescription(`${message.author} has reported ${repAuthor} (${authorID})`)
                .addFields(
                    { name: "**Channel**", value: `<#${reportChannel}>`},
                    { name: "**Message ID**", value: `[${reportID}](${report.url})`},
                    { name: "**Message**", value: `${fetchContent}`}
                )
                sendChannel.send({embeds: [reportEmbed]})
                message.channel.send("Report sent, thank you!")

            }).catch((err) => message.channel.send("Looks like something went wrong!\nPlease verify the ID is correct, and try again!"))


        } catch (err) {
            message.channel.send("Looks like something went wrong!\nPlease try again!")
            
        }
    },
};