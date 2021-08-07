const Discord = require("discord.js")

module.exports = {
    name: "balance",
    category: "eco",
    use: "!m bal",
    description: "shows the balance of the user",
    aliases: ['b', 'bal'],
    cooldown: 2,
    async execute(client, message, args, Discord, economy){

        if(message.guild === null) return message.reply("You can't use this command in a DM!")

        const member = message.mentions.members.first() || message.member

        const memberBal = await client.functions.get("getTargetEcon").execute(message);
        const util = await client.functions.get("getUtil").execute(message)

        if(member === client.user) return message.reply("Dont use the command on me! Use it on somebody else!")

        const balEmbed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`${member.user.username}'s Balance!`)
            .setDescription(`\n**__:moneybag: ${member.user.username} has \`${memberBal.coins}\` black coins! :moneybag:__**\n\nYou can earn more by using \`!m mine\`, for more detail use \`!m help\`!`)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())
            .setColor(`${util.colour}`)

        message.channel.send({embeds: [balEmbed]})

    }
}