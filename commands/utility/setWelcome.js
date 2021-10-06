const Discord = require("discord.js")
const guildData = require("../../models/guildData")

module.exports = {
    name: "welcomeset",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/setWelcome.js",
    aliases: ['wset'],
    category: "admin",
    use: "!m welcomeset",
    description: "sets the welcome channel",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        if(message.member.permissions.has('ADMINISTRATOR') || message.member.id === "576470929874616330"){
            const gpold = await client.functions.get("checkGuild").execute(message)
            if(!message.mentions.channels.first()){ 
                if(gpold.welcomeChannel){ 
                    await guildData.findOneAndUpdate(
                        {
                            guildID: message.guild.id
                        },
                        {
                            $set:{
                                welcomeChannel: ""
                            }
                        }
                    )
                    return message.channel.send("Setting deleted!") 
                }
                else return message.channel.send("Please specify a channel for the welcomes to be logged to!")
            }
            client.functions.get("checkGuild").execute(message)
            if(!message.mentions.channels.first().isText()) return message.channel.send("Please specify a *text* channel for the reports to be logged to!")
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
            
            message.reply("Done!, I have sent a mesage to the welcome channel, please make sure it's there to verify its correct!\n\n(If you should *ever* want to remove this feature from your guild, simply run the command again without mentioning a channel!)")
            client.channels.cache.get(gp.welcomeChannel).send("Hello! I'm Michiru!")
        } else return message.channel.send("You cannot use this command!\nPlease refer to an admin for more info!")
    },
};