const customCommands = require('../../models/customCommands')

module.exports = {
    name: "cc-delete",
    aliases: ['cc-delete', 'cc-remove'],
    category: "cc",
    use: "!m cc-delete",
    cooldown: 2,
    description: "delete a custom command",
    async execute(client, message, args, Discord, economy, util){
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("You can't use this command!")
        if(!args[1]) return message.channel.send(`Please specify the name of the command`)
        const ccCheck = await client.functions.get("ccCheck").execute(message, args[1])
        if(!ccCheck) return message.reply("A custom command with that input doesn't exists!")

        customCommands.deleteOne({
            guildID: message.guild.id,
            input: args[1]        
        })
        
        message.channel.send(`Custom command \`${args[1]}\` deleted!`)
    }
}