const Discord = require("discord.js")

module.exports = {
    name: "buy",
    category: "eco",
    use: "!m buy",
    description: "allows the user to buy a new pick",
    cooldown: 2,
    async execute(client, message, args, Discord, economy, util){

        const bal = economy.get(`${message.author.id}.quartz`)
        const pick = economy.get(`${message.author.id}.pick`)

        if(!args[1]) return message.reply("Add what you want to buy!")

        switch(args[1]){
            case 'reinforced':
                if(pick[0] >= 2) return message.reply("You already have a pickaxe just as good or better!")
                    if(bal >= 300){
                        // var filter = m => m.author.id == message.author.id;
                        
                        // try {
                        //     message.reply(`Are you sure you want to buy the \`reinforced pickaxe\`?\n\n**message Y or N**`)
                        //     var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
                        // } catch (e) {return message.reply("Looks like you took too long to reply!");};
                        
                        // var response = collectedMessages.first().content.toLowerCase()

                        // if(response == "y"){
                            economy.set(`${message.author.id}.pick`, [2, "https://cdn.discordapp.com/attachments/853961222520045598/856605307127857152/reinforced_pick.png"])
                            economy.subtract(`${message.author.id}.quartz`,300)
                            message.channel.send("Done! Now go get some more quartz!")
                        // } else {
                        //     message.channel.send('Purchase canceled!');
                        // }
                    } else {
                        message.reply("Insufficient funds!")
                    }

            break

            case 'elite':
                if(pick[0] >= 3) return message.reply("You already have a pickaxe just as good or better!")
                if(bal >= 800){
                    // var filter = m => m.author.id == message.author.id;
                    
                    // try {
                    //     message.reply(`Are you sure you want to buy the \`elite pickaxe\`?\n\n**message Y or N**`)
                    //     var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
                    // } catch (e) {return message.reply("Looks like you took too long to reply!");};
                    
                    // var response = collectedMessages.first().content.toLowerCase()

                    // if(response == "y"){
                        economy.set(`${message.author.id}.pick`, [3, "https://cdn.discordapp.com/attachments/853961222520045598/856605370693058571/elite_pick.png"])
                        economy.subtract(`${message.author.id}.quartz`,800)
                        message.channel.send("Done! Now go get some more quartz!")
                    // } else {
                    //     message.channel.send('Purchase canceled!');
                    // }
                } else {
                    message.reply("Insufficient funds!")
                }

            break

            case 'pro':
                if(pick[0] >= 4) return message.reply("You already have a pickaxe just as good or better!")
                if(bal >= 1500){
                    // var filter = m => m.author.id == message.author.id;
                    
                    // try {
                    //     message.reply(`Are you sure you want to buy the \`pro pickaxe\`?\n\n**message Y or N**`)
                    //     var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
                    // } catch (e) {return message.reply("Looks like you took too long to reply!");};
                    
                    // var response = collectedMessages.first().content.toLowerCase()

                    // if(response == "y"){
                        economy.set(`${message.author.id}.pick`, [4, "https://cdn.discordapp.com/attachments/853961222520045598/856605417371336714/pro_pick.png"])
                        economy.subtract(`${message.author.id}.quartz`,1500)
                        message.channel.send("Done! Now go get some more quartz!")
                    // } else {
                    //     message.channel.send('Purchase canceled!');
                    // }
                } else {
                    message.reply("Insufficient funds!")
                }

            break

            case 'epic':
                if(pick[0] >= 5) return message.reply("You already have a pickaxe just as good or better!")
                if(bal >= 2700){
                    // var filter = m => m.author.id == message.author.id;
                    
                    // try {
                    //     message.reply(`Are you sure you want to buy the \`epic pickaxe\`?\n\n**message Y or N**`)
                    //     var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
                    // } catch (e) {return message.reply("Looks like you took too long to reply!");};
                    
                    // var response = collectedMessages.first().content.toLowerCase()

                    // if(response == "y"){
                        economy.set(`${message.author.id}.pick`, [5, "https://cdn.discordapp.com/attachments/853961222520045598/856605458457427968/epic_pick.png"])
                        economy.subtract(`${message.author.id}.quartz`,2700)
                        message.channel.send("Done! Now go get some more quartz!")
                    // } else {
                    //     message.channel.send('Purchase canceled!');
                    // }
                } else {
                    message.reply("Insufficient funds!")
                }

            break

            case 'god':
                if(pick[0] >= 6) return message.reply("You already have a pickaxe just as good or better!")
                if(bal >= 4600){
                    // var filter = m => m.author.id == message.author.id;
                    
                    // try {
                    //     message.reply(`Are you sure you want to buy the \`god pickaxe\`?\n\n**message Y or N**`)
                    //     var collectedMessages = await message.channel.awaitMessages(filter, {time: 5000, max: 1, errors: ['time']});
                    // } catch (e) {return message.reply("Looks like you took too long to reply!");};
                    
                    // var response = collectedMessages.first().content.toLowerCase()

                    // if(response == "y"){
                        economy.set(`${message.author.id}.pick`, [6, "https://cdn.discordapp.com/attachments/853961222520045598/856605487494856704/god_pick.png"])
                        economy.subtract(`${message.author.id}.quartz`,4600)
                        message.channel.send("Done! Now go get some more quartz!")
                    // } else {
                    //     message.channel.send('Purchase canceled!');
                    // }
                } else {
                    message.reply("Insufficient funds!")
                }

            break
        }
    }
}