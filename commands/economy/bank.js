const Discord = require("discord.js")
const userEcon = require("../../models/userEcon")

module.exports = {
    name: "bank",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/balance.js",
    category: "eco",
    use: "bal [@member]",
    description: "displays the command users bank account.",
    cooldown: 5,
    maxArgs: 0,
    async execute(client, message, args, Discord){

        const memberBal = await client.functions.get("getUserEcon").execute(message.member);
        const userutil = await client.functions.get("getUserUtil").execute(message.member);
        if(!memberBal.bank) {
        await userEcon.findOneAndUpdate({ userID: message.member.user.id },{ $set: {bank: 0} })
        bankbal = 0
        }
        else {bankbal = memberBal.bank}
        const row = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
            .setCustomId('deposit')
            .setLabel('Deposit')
            .setStyle('SUCCESS')
            .setEmoji('📨'),
        new Discord.MessageButton()
            .setCustomId('withdrawl')
            .setLabel('Withdrawl')
            .setStyle('DANGER')
            .setEmoji('🏧'),
        new Discord.MessageButton()
            .setCustomId('transfer')
            .setLabel('Transfer')
            .setStyle('PRIMARY')
            .setEmoji('🤝'))

        const balEmbed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.member.user.username}'s Bank!`)
            .setDescription(`\n**__🏦 ${message.member.user.username} has \`${memberBal.bank}\` coins in the bank! 🏦__**\n\nUse the buttons below to interact with your bank account!`)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())
            .setColor(`${userutil.colour}`)

        message.reply({embeds: [balEmbed], components: [row]})
    }
}