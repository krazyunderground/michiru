const Discord = require("discord.js")

module.exports = {
    name: "goal",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/target.js",
    aliases: ['target'],
    use: "goal",
    category: "general",
    description: "allows people to see the current progress/publicity of the bot",
    cooldown: 0,
    async execute(client, message, args, Discord){
        const userutil = await client.functions.get("getUserUtil").execute(message.member)

        const number = client.guilds.cache.size

        const value = number
        const max = 100
        const size = 20

        const percent = value / max
        const progress = Math.round((size * percent))
        const empty = size - progress
        
        const progressText = '█'.repeat(progress);
        const emptyProgressText = '—'.repeat(empty);
        const percentageText = ' (' + Math.round(percent * 100) + '%)';
        const bar = '```[' + progressText + emptyProgressText + ']' + percentageText + '```';

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.member.user.username}'s Goal Progress Request!`)
            .setDescription(`Help Michiru get to 100 servers!\n ${bar}`)
            .setColor(userutil.colour)
            .setTimestamp()
            .setFooter("🌐", client.user.displayAvatarURL())
        message.reply({embeds: [embed]})
    }
}