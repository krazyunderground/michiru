const ms = require('ms')
module.exports = {
    name: 'userinfo',
    aliases: ["whois"],
    description: 'this show a user\'s info!',
    cooldown: 0,
    category: "basic",
    use: "!m serverinfo",
    async execute(client, message, args, Discord, economy, util){
        let member = message.mentions.members.first() || message.member;
        let user = member.user
        const joinDiscord = user.createdAt
        const joinServer = member.joinedAt
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
            .setDescription(`${user}`)
            .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
            .setThumbnail(user.displayAvatarURL())
            .addField('Joined at:', `${joinServer}`, true)
            .addField('Created at:', `${joinDiscord}`, true)
            .addField('Status:', user.presence.status, true)
            .addField('Roles:', member.roles.cache.map(r => `${r}`).join(" ").split(" ").slice(0,-1).join(" | "), true)
            .setFooter(`ID: ${user.id}`)
            .setTimestamp();
    
        message.channel.send({ embed: embed });
        return;
    }
}