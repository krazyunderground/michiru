const userEcon = require('../../models/userEcon')
module.exports = {
    name: "coinflip",
    aliases: ["cf"],
    category: "fun",
    use: "coinflip <amount>",
    cooldown: 1,
    description: "flip a coin.",
    async execute(client, message, args, Discord, economy, util){
        let amount = args[1];
        if (isNaN(args[1]) || amount % 1 != 0) return message.channel.send("Please make sure the amount is a whole number!")
        const memberBal = await client.functions.get("getAuthorEcon").execute(message);
        if (memberBal.coins < amount) return message.channel.send("You don't have enough coins!")
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        let result = 0;
        if(randomNumber >= 2) {
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
            message.channel.send(`You won \`${result}\` coins!`)
            return
        }
        if(randomNumber <= 1) {
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
            message.channel.send(`You lost \`${result}\` coins!`)
            return
        }
        
    }
}