const Discord = require("discord.js")

module.exports = {
    name: "prefix",
    aliases: ['setprefix'],
    category: "admin",
    use: "!m prefix",
    description: "allows the user to choose a new guild prefix",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){

        if(message.member.permissions.has('ADMINISTRATOR') || message.member.id === "576470929874616330"){

            if(!args[1]) return message.channel.send("Add what you want to change the prefix to!")

            var filter = m => m.author.id == message.author.id;
                            
            try {
                message.reply(`Are you sure you want to change the guild prefix?\nOld: \`${util.get(`${message.guild.id}.prefix`)}\`\nNew: \`${args[1]}\`\n\n**message Y or N**`)
                var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
            } catch (e) {return message.reply("Looks like you took too long to reply!");};
                            
            var response = collectedMessages.first().content.toLowerCase()

            if(response == "y"){
                util.set(`${message.guild.id}.prefix`, args[1])
                message.channel.send("Prefix successfully changed!")
            } else {
                message.channel.send('Action canceled!');
            }

        } else return message.reply("You need admin perms to run that command!")
    }
}