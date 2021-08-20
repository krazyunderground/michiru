const owoify = require("owoify-js").default
module.exports = {
    name: 'owoify',
    aliases: ["owo"],
    description: 'owoifies text',
    cooldown: 0,
    category: "basic",
    use: "!m owoify",
    async execute(client, message, args, Discord, economy, util){
        if(!args[1]) return message.channel.send(`include what you want to translate!`)
        message.channel.send(owoify(args.slice(1).join(" ")))
    }
}