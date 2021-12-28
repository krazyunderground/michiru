const ms = require('ms')
module.exports = {
    name: 'avatar',
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/avatar.js",
    aliases: ["av"],
    description: 'display a user\'s avatar!',
    cooldown: 0,
    category: "general",
    use: "avatar",
    async execute(client, message, args, Discord){
        const userutil = await client.functions.get("getUserUtil").execute(message.member)
        
        let member = message.mentions.members.first() || message.member;
        let user = member.user
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${user}'s Avatar!`)
            .setColor(userutil.colour)
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            .setFooter("🌐",`ID: ${user.id}`, client.user.displayAvatarURL())
            .setTimestamp();
    
        message.reply({ embeds: [embed] });
        return;
    }
}