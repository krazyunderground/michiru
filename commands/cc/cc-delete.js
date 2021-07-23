module.exports = {
    name: "cc-delete",
    aliases: ['cc-delete', 'cc-remove'],
    cooldown: 2,
    description: "delete a custom command",
    execute(client, message, args, Discord, economy, util){
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("you can't use this command!")
        if(!args[1]) return message.channel.send(`Please specify the name of the command`)
        util.delete(`${message.guild.id}.commands.${args[1]}`)
        message.reply("Custom command deleted!")
    }
}