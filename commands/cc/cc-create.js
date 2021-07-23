module.exports = {
    name: "cc-create",
    aliases: ['cc'],
    cooldown: 2,
    description: "shows the balance of the user",
    execute(client, message, args, Discord, economy, util){
        if(!args[1]) return message.channel.send(`Please specify a name for the command`)
        if(!args[2]) return message.channel.send(`Please specify a reply for the command`)
        util.set(`${message.guild.id}.commands.${args[1]}.response`, args.slice(2).join(" "))
        util.set(`${message.guild.id}.commands.${args[1]}.name`, args[1])
        message.reply("Custom command created!")
    }
}