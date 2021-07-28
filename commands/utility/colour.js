const Discord = require("discord.js")

module.exports = {
    name: "colour",
    aliases: ['color', 'setcolour', 'setcolor'],
    category: "basic",
    use: "!m colour",
    cooldown: 0,
    description: "allows the user to set a new colour for their embeds",
    async execute(client, message, args, Discord, economy, util){

        var re = /[0-9A-Fa-f]{6}/g
        if(re.test(args[1])) {
            var filter = m => m.author.id == message.author.id;
                        
                // try {
                //     var colourEmbed = Discord.MessageEmbed()
                //         .setTitle("Are you sure this is the colour you want")
                //         .setDescription("**Message Y / N**")
                //         .setColor(args[1])
                //     message.channel.send(colourEmbed)
                //     var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
                // } catch (e) {return message.reply("Looks like you took too long to reply!");};

                try {
                    // message.reply(`Are you sure you want to buy the \`reinforced pickaxe\`?\n\n**message Y or N**`)
                    var colourEmbed = new Discord.MessageEmbed()
                        .setTitle("Are you sure this is the colour you want")
                        .setDescription("**Message Y / N**")
                        .setColor(args[1])
                    message.channel.send({embeds: [colourEmbed]})
                    var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
                } catch (e) {return message.reply("Looks like you took too long to reply!");};
                
                var response = collectedMessages.first().content.toLowerCase()

                if(response == "y"){
                    util.set(`${message.guild.id}.${message.author.id}.colour`, args[1])
                    message.reply("Colour successfully changed for this server!")
                } else {
                    message.channel.send('Action canceled!');
                }
        } else {
            message.reply("Use a valid hex code! ||E.G:`FF9CA9`||")
        }
    }
}