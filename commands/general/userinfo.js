const ms = require('ms')
module.exports = {
    name: 'userinfo',
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/userinfo.js",
    aliases: ["whois"],
    description: 'this show a user\'s info!',
    cooldown: 0,
    category: "general",
    use: "userinfo",
    async execute(client, message, args, Discord){
        const userutil = await client.functions.get("getUserUtil").execute(message.member)
        
        let member = message.mentions.members.first() || message.member;
        let user = member.user

        const joinDiscord = user.createdAt
        const joinServer = member.joinedAt
        
        const roles = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
            .setCustomId('roles')
            .setLabel('View Roles')
            .setStyle('PRIMARY')
            .setEmoji('📜'))
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${user.username}'s Info!`)
            .setDescription(`${user}`)
            .setColor(userutil.colour)
            .setThumbnail(user.displayAvatarURL({dynamic: true, size: 4096}))
            .addField('Joined at:', `${joinServer}`, false)
            .addField('Created at:', `${joinDiscord}`, false)
            .setFooter(`🌐 Id: ${user.id}`, client.user.displayAvatarURL())
            .setTimestamp();
    
        message.reply({ embeds: [embed], components: [roles]});
        return;
    }
}