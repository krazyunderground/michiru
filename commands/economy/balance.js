const Discord = require("discord.js")

module.exports = {
    name: "balance",
    category: "eco",
    use: "!m bal",
    description: "shows the balance of the user",
    aliases: ['b', 'bal'],
    cooldown: 2,
    execute(client, message, args, Discord, economy, util){

        if(message.guild === null) return message.reply("You can't use this command in a DM!")

        const member = message.mentions.members.first() || message.member
        if(member === client.user) return message.reply("Dont use the command on me! Use it on somebody else!")
        
        if(!economy.has(`${member.id}.quartz`)){
            economy.set(`${member.id}.quartz`, 200)
        }

        const bal = economy.get(`${member.id}.quartz`)

        const balEmbed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`${member.user.username}'s Balance!`)
            .setDescription(`\n**__<:mininggems:854075484869230652> ${member.user.username} has \`${bal}\` black quartz! <:mininggems2:854075538938003470>__**\n\nYou can earn more by using \`!m mine\`, for more detail use \`!m help\`!`)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())
            .setColor(util.get(`${message.author.id}.colour`))

        message.channel.send({embeds: [balEmbed]})

    }
}