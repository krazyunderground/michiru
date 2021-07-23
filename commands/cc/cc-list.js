module.exports = {
    name: "list",
    aliases: ['cc-list', 'custom-commands'],
    cooldown: 2,
    description: "shows the balance of the user",
    execute(client, message, args, Discord, economy, util){
        var cclist = util.get(`${message.guild.id}.commands`)
        const embed = new Discord.MessageEmbed()
        .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
        .setTitle(`${message.guild.name}'s custom commands!`)

        var names = []

        for (const [key, value] of Object.entries(cclist)) {
            names.push(`- **${key}**`)
        }
        embed.setDescription(names.join("\n"))
        message.channel.send(embed)
    }
}