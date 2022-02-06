const Discord = require("discord.js")

module.exports = {
    name: "balance",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/balance.js",
    category: "eco",
    use: "bal [@member]",
    description: "shows the balance of the target user.",
    aliases: ['b', 'bal'],
    cooldown: 5,
    maxArgs: 1,
    async execute(client, message, args, Discord){

        if(message.guild === null) return message.reply("You can't use this command in a DM!")

        let member = message.mentions ? message.mentions.members.first() : message.member
        
        if(!member) member = message.member

        const memberBal = await client.functions.get("getUserEcon").execute(member);
        const userutil = await client.functions.get("getUserUtil").execute(member);

        if(member === client.user) return message.reply("Dont use the command on me! Use it on somebody else!")

        const balEmbed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`${member.user.username}'s Balance!`)
            .setDescription(`\n**__:moneybag: ${member.user.username} is holding \`${memberBal.coins}\` coins and has a bank balance of \`${memberBal.bank} coins\` :moneybag:__**\n\nYou can earn more by using \`!m mine\`, for more detail use \`!m help\`!`)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())
            .setColor(`${userutil.colour}`)

        message.reply({embeds: [balEmbed]})

    }
}