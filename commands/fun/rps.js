module.exports = {
    name: "rps",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/rps.js",
    category: "fun",
    use: "rps",
    cooldown: 120,
    description: "play rock paper scissors against me.",
    async execute(client, message, args, Discord){
        const responses = ["rock", "paper", "scissors"]
        const random = Math.floor(Math.random() * responses.length);
        const result = responses[random]

        const choice =  args[1]
        if (!choice) return message.reply("Please select rock, paper, or scissors")
        if (!responses.includes(choice)) return message.reply("Please select rock, paper, or scissors")
        if (result === choice) return message.reply("Its a tie!")
        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.reply('I won with paper!');
                else return message.reply('You won, I chose paper!');
            }
            case 'paper': {
                if (result === 'scissors') return message.reply('I won with scissors!');
                else return message.reply('You won, I chose scissors!');        
            }
            case 'scissors': {
                if (result === 'rock') return message.reply('I won with rock!');
                else return message.reply('You won, I chose rock!');
            }
            default: {
                return message.reply("Please select rock, paper, or scissors");
            }
        }
    }
}