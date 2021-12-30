const customCommands = require('../../models/customCommands')

module.exports = {
    name: "cc-delete",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/cc/cc-delete.js",
    aliases: ['cc-delete', 'cc-remove'],
    category: "cc",
    use: "cc-delete",
    cooldown: 2,
    description: "delete a custom command.",
    async execute(client, message, args, Discord){
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("You can't use this command!")
        if(!args[1]) return message.reply(`Please specify the name of the command`)
        const ccCheck = await client.functions.get("ccCheck").execute(message, args[1])
        if(!ccCheck) return message.reply("A custom command with that input doesn't exists!")

        customCommands.deleteOne({
            guildID: message.guild.id,
            input: args[1]        
        })
        
        message.reply(`Custom command \`${args[1]}\` deleted!`)
    }
};