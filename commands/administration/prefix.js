const Discord = require("discord.js")
const guildData = require('../../models/guildData')

module.exports = {
    name: "prefix",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/prefix.js",
    aliases: ['setprefix'],
    category: "admin",
    use: "prefix <\"prefix\">",
    description: "allows the user to choose a new guild prefix",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        const guildProfile = await client.functions.get("guildCheck").execute(message)

        if(message.member.permissions.has('ADMINISTRATOR') || message.member.id === "576470929874616330"){

            if(!args[1]) return message.channel.send("Add what you want to change the prefix to!")
            if(!args[1].startsWith('"') || !message.content.endsWith('"')) return message.channel.send("You need to use the speechmarks around the new prefix")
            const prefix = message.content.split('"').slice(1)[0]
            if(!prefix.length < 1) message.reply("You can't have a prefix less than 1!")
            if(prefix.length > 15) return message.channel.send("Prefixes are character limited to 15")

            const filter = response => {
                return response.author.id === message.author.id
            };
            
            message.reply(`Are you sure you want to change the guild prefix?\nOld: \`${guildProfile.prefix}\`\nNew: \`${prefix}\`\n\n**Y** to continue`, { fetchReply: true })
            .then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                .then(async collected => {
                    if(collected.first().content === "y"){
                    await guildData.findOneAndUpdate(
                            {
                                guildID: message.guild.id,
                            },
                            {
                                $set: {
                                    prefix: prefix.toLowerCase(),
                                },
                            })
                        message.reply(`Prefix successfully changed to \`${prefix.toLowerCase()}\`!`);

                    } else {
                        message.reply('Action canceled!');
                    }
                })
                .catch(collected => {
                    message.reply('Action canceled!');
                });
            });         
        } else return message.reply("You need admin perms to run that command!")
    }
}