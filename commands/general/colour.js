const Discord = require("discord.js")
const userUtil = require('../../models/userUtil')
module.exports = {
    name: "colour",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/colour.js",
    aliases: ['color', 'setcolour', 'setcolor'],
    category: "general",
    use: "colour",
    cooldown: 0,
    description: "allows the user to set a new colour for their embeds",
    async execute(client, message, args, Discord, economy, util){
        if(!client.guilds.cache.get("848707853350862858").members.cache.get(message.author.id).roles.cache.has("854061604258054214")){
            if(!client.guilds.cache.get("848707853350862858").members.cache.get(message.author.id).roles.cache.has("868656454054342677")) return message.channel.send("This is a booster only feature! To access such features, boost here: discord.gg/t9yebSe7jg\n(or you can try to barter with Krazy)")
        }

        var re = /[0-9A-Fa-f]{6}/g
        if(re.test(args[1])){
            var colour = args[1].replace("#", "").toUpperCase()
            var colourEmbed = new Discord.MessageEmbed()
              .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
              .setTitle(`${message.author.username}'s New Colour!`)
              .setDescription('Want your own custom color? Boost the support server! [Join Here](https://discord.gg/t9yebSe7jg)')
              .setColor(args[1])
              .setTimestamp()
              .setFooter("🌐", client.user.displayAvatarURL())
            message.channel.send({embeds: [colourEmbed]})
            await userUtil.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $set: {
                    colour: colour,
                  },
                })
        } else{
            message.reply("Use a valid hex code! ||E.G:`FF9CA9`||")
        }
    }
}