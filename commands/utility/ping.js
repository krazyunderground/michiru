const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "shows latencies of the bot",
    cooldown: 0,
    execute(client, message, args, Discord, economy, util){

        const pingEmbed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setDescription(`🏓 Latency is ${message.createdTimestamp - Date.now()}ms \n⌛API Latency is ${Math.round(client.ws.ping)}ms`)
            .setFooter("Pong!", client.user.displayAvatarURL())
            .setTimestamp()
            .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
        
        message.channel.send(pingEmbed)

    }
}