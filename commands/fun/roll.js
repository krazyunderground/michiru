const userEcon = require('../../models/userEcon')
module.exports = {
    name: "roll",
    category: "fun",
    use: "roll <amount>",
    cooldown: 1,
    description: "Try to roll a higher number than me.",
    async execute(client, message, args, Discord, economy, util){
        let amount = args[1];
        if (isNaN(args[1]) || amount % 1 != 0) return message.channel.send("Please make sure the amount is a whole number!")
        const memberBal = await client.functions.get("getAuthorEcon").execute(message);
        if (memberBal.coins < amount) return message.channel.send("You don't have enough coins!")
        let userRoll = Math.floor(Math.random() * 6) + 1;
        let botRoll = Math.floor(Math.random() * 6) + 1;
        let result = 0;
        if(userRoll > botRoll) {
            result = amount * .5
            await userEcon.findOneAndUpdate(
                {
                    userID: message.author.id
                },
                {
                    $inc:{
                        coins: result
                    }
                }
            )
            message.channel.send(`You won \`${result}\` coins with a \`${userRoll}\`!`)
            return
        }
        if(botRoll > userRoll) {
            result = amount
            await userEcon.findOneAndUpdate(
                {
                    userID: message.author.id
                },
                {
                    $inc:{
                        coins: -result
                    }
                }
            )
            message.channel.send(`You lost \`${result}\` coins with a \`${userRoll}\`!`)
            return
        }
    }
}