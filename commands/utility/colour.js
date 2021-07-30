const Discord = require("discord.js")

module.exports = {
    name: "colour",
    aliases: ['color', 'setcolour', 'setcolor'],
    category: "basic",
    use: "!m colour",
    cooldown: 0,
    description: "allows the user to set a new colour for their embeds",
    async execute(client, message, args, Discord, economy, util){
        // 854061604258054214
        if(!client.guilds.cache.get("848707853350862858").members.cache.get(message.author.id).roles.cache.has("854061604258054214")){
            if(!client.guilds.cache.get("848707853350862858").members.cache.get(message.author.id).roles.cache.has("868656454054342677")) return message.channel.send("This is a booster only feature! To access such features, boost here: discord.gg/t9yebSe7jg\n(or you can try to barter with Krazy)")
        }

        var re = /[0-9A-Fa-f]{6}/g
        // if(re.test(args[1])) {
        //     var filter = m => m.author.id == message.author.id;

        if(re.test(args[1])){
            var colourEmbed = new Discord.MessageEmbed()
                .setTitle("New colour")
                // .setDescription("**Message Y / N**")
                .setColor(args[1])
            message.channel.send({embeds: [colourEmbed]})
            // var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
        // } catch (e) {return message.reply("Looks like you took too long to reply!");};
        
        // var response = collectedMessages.first().content.toLowerCase()

        // if(response == "y"){
            util.set(`${message.author.id}.colour`, args[1])
            message.reply("Colour successfully changed for this server!")
        // } else {
        //     message.channel.send('Action canceled!');
        // }
        } else{
            message.reply("Use a valid hex code! ||E.G:`FF9CA9`||")
        }
    }
}