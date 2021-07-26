const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "shows latencies of the bot",
    category: "basic",
    use: "!m ping",
    cooldown: 0,
    execute(client, message, args, Discord, economy, util){

        const pingEmbed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setDescription(`🏓 Latency is ${message.createdTimestamp - Date.now()}ms \n⌛API Latency is ${Math.round(client.ws.ping)}ms\nshard id: ${message.guild.shardID}`)
            .setFooter("Pong!", client.user.displayAvatarURL())
            .setTimestamp()
            .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
        
        message.channel.send(pingEmbed)

    }
}