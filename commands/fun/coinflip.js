const userEcon = require('../../models/userEcon')
module.exports = {
    name: "coinflip",
    aliases: ["cf"],
    category: "fun",
    use: "coinflip <amount> [side]",
    cooldown: 1,
    description: "flip a coin.",
    async execute(client, message, args, Discord, economy, util){
        //get the bet amount
        let amount = args[1];
        if (isNaN(args[1]) || amount % 1 != 0) return message.channel.send("Please make sure the amount is a whole number!")
        if (args[1] > 1000) return message.channel.send("I'm sorry, the max bet is 1000 coins!")

        //make sure they have enough coins
        const memberBal = await client.functions.get("getAuthorEcon").execute(message);
        if (memberBal.coins < amount) return message.channel.send("You don't have enough coins!")

        //find what side they want, default to heads if none
        let side = args[2] ? args[2] : "heads"
        const sides = ["heads", "tails"]
        if (!sides.includes(side)) return message.channel.send("Please choose \`heads\` or \`tails\`")
        //get a number, 1 (heads) and 2 (heads)
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        let result;
        if (randomNumber == 1) {
            if (side === "heads") {result = "true"}
            else {result = "false"}
        }
        if (randomNumber == 2) {
            if (side === "heads") {result = "false"}
            else {result = "true"}
        }
        console.log(`number, ${randomNumber} | side, ${side} | result, ${result}`)
        if(result === "true") {
            let final = amount * .5
            await userEcon.findOneAndUpdate(
                {
                    userID: message.author.id
                },
                {
                    $inc:{
                        coins: final
                    }
                }
            )
            message.channel.send(`You won \`${final}\` coins!`)
            return
        }

        if(result === "false") {
            let final = amount
            await userEcon.findOneAndUpdate(
                {
                    userID: message.author.id
                },
                {
                    $inc:{
                        coins: -final
                    }
                }
            )
            message.channel.send(`You lost \`${final}\` coins!`)
            return
        }
        
    }
}