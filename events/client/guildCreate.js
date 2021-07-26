module.exports = (Discord, client, guild) => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    const inviteEmbed = new Discord.MessageEmbed()
        .setThumbnail("https://i.imgur.com/BeerOcA.jpg")
        .setImage("https://thumbs.gfycat.com/ThinEnchantingCusimanse-max-1mb.gif")
        .setTitle("Hello!")
        .setDescription(`Hi! I'm Michiru, A discord bot made by Krazyunderground#0001, Thanks for inviting me!\n\nIf you have any questions or want to report a bug, Krazy's DMs are ~~usually~~ open!\n\nTo get started, use \`!m help\``)
        .setFooter("👋")
        .setTimestamp()
    channel.send(inviteEmbed)
}