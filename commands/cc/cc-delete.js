module.exports = {
    name: "cc-delete",
    aliases: ['cc-delete', 'cc-remove'],
    cooldown: 2,
    description: "shows the balance of the user",
    execute(client, message, args, Discord, economy, util){
        if(!args[1]) return message.channel.send(`Please specify the name of the command`)
        util.delete(`${message.guild.id}.commands.${args[1]}`)
        message.reply("Custom command deleted!")
    }
}