const Discord = require("discord.js")

module.exports = {
    name: "mine",
    category: "eco",
    use: "!m mine",
    aliases: ['work', 'm', 'w'],
    cooldown: 5,
    description: "allows the user to get more quartz",
    execute(client, message, args, Discord, economy, util){
        if(message.guild === null) return message.reply("You can't use this command in a DM!")
        
        if(!economy.has(`${message.author.id}.quartz`)){
            economy.set(`${message.author.id}.quartz`, 200)
        }

        function randomInt(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min) + min)
        }
        
        const pick = economy.get(`${message.author.id}.pick`)

        const mini = 1
        const maxi = 50

        const base = randomInt(mini, maxi)

        if(pick[0] == 1){
            var amount = base
        } else if(pick[0] == 2){
            var amount = Math.round(base * 1.1)
        } else if(pick[0] == 3){
            var amount = Math.round(base * 1.2)
        } else if(pick[0] == 4){
            var amount = Math.round(base * 1.5)
        } else if(pick[0] == 5){
            var amount = Math.round(base * 2)
        } else if(pick[0] == 6){
            var amount = Math.round(base * 3)
        }

        if(pick[0] == 1){
            var pickaxe = "basic"
        } else if(pick[0] == 2){
            var pickaxe = "reinforced"
        } else if(pick[0] == 3){
            var pickaxe = "elite"
        } else if(pick[0] == 4){
            var pickaxe = "pro"
        } else if(pick[0] == 5){
            var pickaxe = "epic"
        } else if(pick[0] == 6){
            var pickaxe = "god"
        }

        

        economy.add(`${message.author.id}.quartz`, amount)

        const balEmbed = new Discord.MessageEmbed()
            .setThumbnail(pick[1])
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.member.user.username}'s Mining Expedition!`)
            .setDescription(`\n**__<:mininggems:854075484869230652> ${message.member.user.username} has gained \`${amount}\` black quartz! <:mininggems2:854075538938003470>__**\nCurrent pickaxe: \`${pickaxe}\`\nNew total: \`${economy.get(`${message.author.id}.quartz`)}\`\n\nNow that you have more quartz, you can buy thingss in the \`!m shop\`! \nFor more detail use \`!m help\`!`)
            .setTimestamp()
            .setFooter("⛏️", client.user.displayAvatarURL())
            .setColor(util.get(`${message.author.id}.colour`))

        message.channel.send({embeds: [balEmbed]})
    }
}