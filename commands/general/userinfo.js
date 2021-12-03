const ms = require('ms')
module.exports = {
    name: 'userinfo',
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/userinfo.js",
    aliases: ["whois"],
    description: 'this show a user\'s info!',
    cooldown: 0,
    category: "general",
    use: "userinfo",
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message)
        
        let member = message.mentions.members.first() || message.member;
        let user = member.user
        const joinDiscord = user.createdAt
        const joinServer = member.joinedAt
        const roles = member.roles.cache.map(r => `${r}`).join(" ").split(" ").slice(0,-1).join(" | ") || "No Data"
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${user.username}'s Info!`)
            .setDescription(`${user}`)
            .setColor(userutil.colour)
            .setThumbnail(user.displayAvatarURL({dynamic: true, size: 4096}))
            .addField('Joined at:', `${joinServer}`, true)
            .addField('Created at:', `${joinDiscord}`, true)
            .addField('Roles:', roles)
            .setFooter("🌐", client.user.displayAvatarURL())
            .setTimestamp();
    
        message.channel.send({ embeds: [embed] });
        return;
    }
}