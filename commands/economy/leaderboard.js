const userEcon = require('../../models/userEcon')
module.exports = {
    name: "leaderboard",
    aliases: ["lead"],
    category: "eco",
    use: "leaderboard <all / guild>",
    cooldown: 120,
    description: "show's richest players in the guild",
    async execute(client, message, args, Discord){
        userEcon.find({}, null, {skip:0, limit:10, sort:{ coins: -1 }}, async function(err, lead){
            const ten = new Array()
            var count = 1
            
            lead.forEach(prof => {
                ten.push(`${count}. ${client.users.cache.get(prof.userID).tag}: ${prof.coins}`)
                count += 1
            })


            const embed = new Discord.MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`Global Leaderboard!`)
                .setDescription(ten.join("\n"))
                .setTimestamp()
                .setFooter("💸", client.user.displayAvatarURL())
            
            message.reply({embeds: [embed]})
        })
    }
}