const {Captcha} = require("captcha-canvas")
const { MessageAttachment } = require("discord.js")
module.exports = {
    name: "captcha",
    category: "admin",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/moderation/captcha.js",
    use: "captcha",
    aliases: ["verify"],
    cooldown: 60,
    description: "captcha command used only to test the system",
    async execute(client, message, args, Discord, economy, util){
        const gp = await client.functions.get("guildCheck").execute(message)
        if(!gp.captchaRole) return 
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.delete()

        if(message.member.roles.cache.has(gp.captchaRole)) return message.reply("Already verified!")

        const captcha = new Captcha()
        captcha.async = true
        captcha.addDecoy()
        captcha.drawTrace()
        captcha.drawCaptcha()
        
        const captchaAttachment = new MessageAttachment(await captcha.png, "captcha.png")

        const responsemsg = await message.member.send({files: [captchaAttachment], content: `Solve the captcha to be verified in ${message.member.guild.name}!`})

        const filter = (m) => m.author.id === message.author.id
        try{
            const collector = responsemsg.channel.createMessageCollector({filter, time: 30000})
            collector.on("collect", response => {
                if(response.content === captcha.text) {
                    message.member.roles.add(gp.captchaRole)
                    message.member.send(`You've been verified in ${message.member.guild.name}! 🎉`)
                    return
                } else {
                    if(!message.member.roles.cache.has(gp.captchaRole)){
                        message.member.send(`You failed to verify, so you have been kicked. Simply rejoin to try again!`)
                        if(message.member.kickable) message.member.kick()
                        return
                    }
                    
                }
            }) 
            collector.on("end", response => {
                if(!message.member.roles.cache.has(gp.captchaRole) && response.size === 0){
                    message.member.send(`You failed to verify, so you have been kicked. Simply rejoin to try again!`)
                    if(message.member.kickable) message.member.kick()
                    return
                }
            })
        } catch(err) {
            message.member.send(`An error may have occoured, so you have been kicked. Simply rejoin to try again!`)
            if(message.member.kickable) message.member.kick()
            return
        }
    }
}