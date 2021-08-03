const Discord = require("discord.js")
const userEcon = require("../../models/userEcon")

module.exports = {
    name: "mine",
    category: "eco",
    use: "!m mine",
    aliases: ['work', 'm', 'w'],
    cooldown: 5,
    description: "allows the user to get more quartz",
    async execute(client, message, args, Discord, economy, util){
        if(message.guild === null) return message.reply("You can't use this command in a DM!")

        const userecon = await client.functions.get("getAuthorEcon").execute(message);
        const userutil = await client.functions.get("getUtil").execute(message);

        const bal = userecon.quartz
        const pick = userecon.pick

        function randomInt(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min) + min)
        }

        const mini = 1
        const maxi = 50

        const base = randomInt(mini, maxi)

        // if(pick == 1){
        //     var amount = base
        // } else if(pick == 2){
        //     var amount = Math.round(base * 1.1)
        // } else if(pick == 3){
        //     var amount = Math.round(base * 1.2)
        // } else if(pick == 4){
        //     var amount = Math.round(base * 1.5)
        // } else if(pick == 5){
        //     var amount = Math.round(base * 2)
        // } else if(pick == 6){
        //     var amount = Math.round(base * 3)
        // }

        // if(pick == 1){
        //     var pickaxe = "basic"
        // } else if(pick == 2){
        //     var pickaxe = "reinforced"
        // } else if(pick == 3){
        //     var pickaxe = "elite"
        // } else if(pick == 4){
        //     var pickaxe = "pro"
        // } else if(pick == 5){
        //     var pickaxe = "epic"
        // } else if(pick == 6){
        //     var pickaxe = "god"
        // }
//you smort
//just making it efficient
        switch(pick){
            case 1:
                var amount = base
                var pickaxe = "basic"
            break
            case 2:
                var amount = Math.round(base * 1.1)
                var pickaxe = "reinforced"
            break
            case 3:
                var amount = Math.round(base * 1.2)
                var pickaxe = "elite"
            break
            case 4:
                var amount = Math.round(base * 1.5)
                var pickaxe = "pro"
            break
            case 5:
                var amount = Math.round(base * 2)
                var pickaxe = "epic"
            break
            case 6:
                var amount = Math.round(base * 3)
                var pickaxe = "god"
            break
        }

        await userEcon.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                quartz: amount,
              },
            })
            const newbal = bal + amount;

        const balEmbed = new Discord.MessageEmbed()
            .setThumbnail(pick[1])
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.member.user.username}'s Mining Expedition!`)
            .setDescription(`\n**__<:mininggems:854075484869230652> ${message.member.user.username} has gained \`${amount}\` black quartz! <:mininggems2:854075538938003470>__**\nCurrent pickaxe: \`${pickaxe}\`\nNew total: \`${newbal}\`\n\nNow that you have more quartz, you can buy thingss in the \`!m shop\`! \nFor more detail use \`!m help\`!`)
            .setTimestamp()
            .setFooter("⛏️", client.user.displayAvatarURL())
            .setColor(userutil.colour)

        message.channel.send({embeds: [balEmbed]})
    }
}