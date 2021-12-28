const userEcon = require('../../models/userEcon')
module.exports = {
    name: "roll",
    category: "fun",
    use: "roll <amount>",
    cooldown: 120,
    description: "roll a dice and try to beat my roll.",
    async execute(client, message, args, Discord){
        let amount = args[1];
        if (isNaN(args[1]) || amount % 1 != 0) return message.reply("Please make sure the amount is a whole number!")
        if (args[1] > 1000) return message.reply("I'm sorry, the max bet is 1000 coins!")
        const memberBal = await client.functions.get("getUserEcon").execute(message.member);
        if (memberBal.coins < amount) return message.reply("You don't have enough coins!")
        let userRoll = Math.floor(Math.random() * 6) + 1;
        let botRoll = Math.floor(Math.random() * 6) + 1;
        let result = 0;
        if(userRoll > botRoll) {
            result = amount * .5
            await userEcon.findOneAndUpdate(
                {
                    userID: message.member.id
                },
                {
                    $inc:{
                        coins: result
                    }
                }
            )
            message.reply(`You won \`${result}\` coins with a \`${userRoll}\`!`)
            return
        }
        if(botRoll > userRoll) {
            result = amount
            await userEcon.findOneAndUpdate(
                {
                    userID: message.member.id
                },
                {
                    $inc:{
                        coins: -result
                    }
                }
            )
            message.reply(`You lost \`${result}\` coins with a \`${userRoll}\`!`)
            return
        }
    }
}