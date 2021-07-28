module.exports = {
    name: "list",
    aliases: ['cc-list', 'custom-commands'],
    category: "cc",
    use: "!m cc-list",
    cooldown: 2,
    description: "list the server's custom commands",
    execute(client, message, args, Discord, economy, util){
        var cclist = util.get(`${message.guild.id}.commands`)
        const embed = new Discord.MessageEmbed()
        .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
        .setTitle(`${message.guild.name}'s custom commands!`)

        var names = []

        for (const [key, value] of Object.entries(cclist)) {
            names.push(`- **${key}**`)
        }

        if(names.length == 0) return message.channel.send("This server has no commands!")
        embed.setDescription(names.join("\n"))
        message.channel.send({embeds: [embed]})
    }
}