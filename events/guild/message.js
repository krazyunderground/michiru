const db = require('quick.db')
const economy = new db.table('economy')
const util = new db.table('util')

const fs = require('fs')

const cooldowns = new Map()

module.exports = async (Discord, client, message) => {
    
    client.checks.get('economy').execute(Discord, client, message, economy, util)
    client.checks.get('util').execute(Discord, client, message, economy, util)

    let prefix = util.get(`${message.guild.id}.prefix`)

    if(!message.content.toLowerCase().startsWith(prefix) || message.author === client.user) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args[0].toLowerCase()

    const cmd = await client.commands.get(command) || client.commands.find(a => a.aliases && a.aliases.includes(command))

    if(!cmd) return

    if(!cooldowns.has(cmd.name)){
        cooldowns.set(cmd.name, new Discord.Collection())
    }

    const current_time = Date.now()
    const time_stamps = cooldowns.get(cmd.name)
    const cooldown_amount = (cmd.cooldown) * 1000

    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000

            const responses = ["Hold it!", "Objection!", "Take that!", "Not so fast!", "Overruled!"]

            const embed = new Discord.MessageEmbed()
                .setTitle(responses[Math.floor(Math.random() * responses.length)])
                .setDescription(`Please wait \`${time_left.toFixed(1)}\` more seconds before using \`${cmd.name}\` again!`)
                .setThumbnail("https://static.wikia.nocookie.net/aceattorney/images/4/4d/Objection%21_%28SoJ%29.png/revision/latest/scale-to-width-down/275?cb=20210615182924")
                .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))

            return message.channel.send(embed)
        }
    }

    time_stamps.set(message.author.id, current_time)

    if(cmd) cmd.execute(client, message, args, Discord, economy, util)
}