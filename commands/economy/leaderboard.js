const userEcon = require('../../models/userEcon')
module.exports = {
    name: "leaderboard",
    aliases: ["lead"],
    category: "eco",
    use: "leaderboard <all / guild>",
    cooldown: 120,
    description: "show's richest players in the guild",
    async execute(client, message, args, Discord){
        userEcon.find({}).sort({coins: -1}).exec(async (err, docs) => { 
            const leaderboard = [];
            let leaders = 1
            while (leaders < 10 && leaders < docs.length) {
                docs.forEach(prof => {
                    if (client.users.cache.get(prof.userID).tag){
                        leaderboard.push(`${leaders}. ${client.users.cache.get(prof.userID).tag}: ${prof.coins}`)
                        leaders += 1
                    } else {
                        return
                    }
                })
            }
            const userutil = await client.functions.get("getUserUtil").execute(message.member);
            const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`Global Leaderboard!`)
            .setDescription(leaderboard.join("\n"))
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())
            .setColor(`${userutil.colour}`)
        
            message.reply({embeds: [embed]})
        });
    }
}