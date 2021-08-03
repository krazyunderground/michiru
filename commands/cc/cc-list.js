const customCommands = require('../../models/customCommands')

module.exports = {
    name: "list",
    aliases: ['cc-list', 'custom-commands'],
    category: "cc",
    use: "!m cc-list",
    cooldown: 2,
    description: "list the server's custom commands",
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message)
        var cclist = await customCommands.find({ guildID: message.guild.id})
        var names = new Array()
        for (const cc of cclist) {
            names.push(`\`${cc.input}\``)
        }

        const embed = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle(`${message.guild.name}'s custom commands!`)
        if(names.length == 0) return message.channel.send("This server has no commands!")
        embed.setDescription(names.join(" , "))
        message.channel.send({embeds: [embed]})
    }
};
//mines green and not slanted.. so
//huh, fair enough
//i htink its cause im reading it in my head
//boom, try that