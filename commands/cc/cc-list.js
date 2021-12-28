const customCommands = require('../../models/customCommands')

module.exports = {
    name: "list",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/cc/cc-list.js",
    aliases: ['cc-list', 'custom-commands'],
    category: "cc",
    use: "cc-list",
    cooldown: 2,
    description: "list the server's custom commands",
    async execute(client, message, args, Discord){
        const userutil = await client.functions.get("getUserUtil").execute(message.member)
        var cclist = await customCommands.find({ guildID: message.guild.id})
        var names = new Array()
        for (const cc of cclist) {
            names.push(`\`${cc.input}\``)
        }

        const embed = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle(`${message.guild.name}'s Custom Commands!`)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setFooter("🖌️", client.user.displayAvatarURL())
        .setTimestamp()
        if(names.length == 0) return message.reply("This server has no commands!")
        embed.setDescription(names.join(" , "))
        message.reply({embeds: [embed]})
    }
};