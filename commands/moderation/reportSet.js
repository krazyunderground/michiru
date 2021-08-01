const Discord = require("discord.js")

module.exports = {
    name: "reportset",
    aliases: ['repset'],
    category: "admin",
    use: "!m reportset",
    description: "sets the report channel",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        if(message.member.permissions.has('ADMINISTRATOR') || message.member.id === "576470929874616330"){
            if(!message.mentions.channels.first()) return message.channel.send("Please specify a channel for the reports to be logged to!")

            util.set(`${message.guild.id}.reportChannelID`, message.mentions.channels.first().id)
            message.reply("Done!, I have sent a mesage to the report channel, please make sure it's there to verify its correct!")
            client.channels.cache.get(util.get(`${message.guild.id}.reportChannelID`)).send("Hello! I'm Michiru!")
        } else return message.channel.send("You cannot use this command!\nPlease refer to an admin for more info!")
    },
};