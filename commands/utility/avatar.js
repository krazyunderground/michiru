const ms = require('ms')
module.exports = {
    name: 'avatar',
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/avatar.js",
    aliases: ["av"],
    description: 'display a user\'s avatar!',
    cooldown: 0,
    category: "general",
    use: "avatar",
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message)
        
        let member = message.mentions.members.first() || message.member;
        let user = member.user
        const joinDiscord = user.createdAt
        const joinServer = member.joinedAt
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL({dynamic: true}))
            .setDescription(`${user}`)
            .setColor(userutil.colour)
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            .setFooter(`ID: ${user.id}`)
            .setTimestamp();
    
        message.channel.send({ embeds: [embed] });
        return;
    }
}