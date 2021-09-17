const Discord = require("discord.js")
const guildData = require('../../models/guildData')

module.exports = {
    name: "prefix",
    aliases: ['setprefix'],
    category: "admin",
    use: "!m prefix",
    description: "allows the user to choose a new guild prefix",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        const guildProfile = await client.functions.get("checkGuild").execute(message)

        if(message.member.permissions.has('ADMINISTRATOR') || message.member.id === "576470929874616330"){

            if(!args[1]) return message.channel.send("Add what you want to change the prefix to!")
            if(args[1].length > 15) return message.channel.send("Prefixes are character limited to 15")

            const filter = response => {
                return "y" === response.content.toLowerCase();
            };
            
            message.reply(`Are you sure you want to change the guild prefix?\nOld: \`${guildProfile.prefix}\`\nNew: \`${args[1]}\`\n\n**Y** to continue`, { fetchReply: true })
            .then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                .then(async collected => {
                    await guildData.findOneAndUpdate(
                        {
                            guildID: message.guild.id,
                        },
                        {
                            $set: {
                            prefix: args[1].toLowerCase(),
                            },
                        })
                    message.reply("Prefix successfully changed!");
                })
                .catch(collected => {
                    message.reply('Action canceled!');
                });
            });         
        } else return message.reply("You need admin perms to run that command!")
    }
}