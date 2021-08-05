const Discord = require("discord.js")
const guildData = require("../../models/guildData")

module.exports = {
    name: "welcomeset",
    aliases: ['wset'],
    category: "admin",
    use: "!m welcomeset",
    description: "sets the welcome channel",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        if(message.member.permissions.has('ADMINISTRATOR') || message.member.id === "576470929874616330"){
            if(!message.mentions.channels.first()) return message.channel.send("Please specify a channel for the welcomes to be logged to!")
            client.functions.get("checkGuild").execute(message)
            await guildData.findOneAndUpdate(
                {
                    guildID: message.guild.id
                },
                {
                    $set:{
                        welcomeChannel: message.mentions.channels.first().id
                    }
                }
            )

            const gp = await client.functions.get("checkGuild").execute(message)
            
            message.reply("Done!, I have sent a mesage to the welcome channel, please make sure it's there to verify its correct!")
            client.channels.cache.get(gp.welcomeChannel).send("Hello! I'm Michiru!")
        } else return message.channel.send("You cannot use this command!\nPlease refer to an admin for more info!")
    },
};