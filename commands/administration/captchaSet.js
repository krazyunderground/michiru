const Discord = require(`discord.js`)
const guildData = require(`../../models/guildData`)

module.exports = {
    name: `captchasetrole`,
    gitlink: `https://github.com/krazyunderground/michiru/tree/main/commands/moderation/captchaSet.js`,
    aliases: ['captcharole'],
    category: `admin`,
    use: `captchasetrole`,
    description: `sets the captcha channel`,
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        if(message.member.permissions.has('ADMINISTRATOR') || message.member.id === `576470929874616330`){
            if(!message.mentions.roles.first()) return message.channel.send(`Please mention a role to give the new members!`)
            client.functions.get(`guildCheck`).execute(message)
            await guildData.findOneAndUpdate(
                {
                    guildID: message.guild.id
                },
                {
                    $set:{
                        captchaRole: message.mentions.roles.first().id
                    }
                }
            )
            
            message.reply(`Done!, test the system yourself to make sure its correct by removing the ${message.mentions.roles.first().name} role and running the command \`!m captcha\`!`)
        } else return message.channel.send(`You cannot use this command!\nPlease refer to an admin for more info!`)
    },
};