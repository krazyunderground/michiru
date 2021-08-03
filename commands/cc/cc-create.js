const customCommands = require('../../models/customCommands')

module.exports = {
    name: "cc-create",
    aliases: ['cc'],
    category: "cc",
    use: "!m cc-create",
    cooldown: 2,
    description: "create a custom command",
    async execute(client, message, args, Discord, economy, util){
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("You can't use this command!")
        var commands = new Array()
        client.commands.forEach(command =>{ 
            commands.push(command.name)
            if(command.aliases) command.aliases.forEach(alias => {
                commands.push(alias)
            })
            
        })
        if(commands.includes(args[1])) return message.channel.send("This is a built in command of the bot already!")
        if(await client.functions.get("ccCheck").execute(message, args[1])) return message.reply("A command with that input already exists!\nPlease choose a new one, or Delete the old one")
        await customCommands.create({
            guildID: message.guild.id,
            input: args[1],
            output: args.slice(2).join(" ")
        })
        message.channel.send(`Custom command \`${args[1]}\` created!`)
    }
}
