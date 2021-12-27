const owoify = require("owoify-js").default
module.exports = {
    name: 'owoify',
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/owoify.js",
    aliases: ["owo"],
    description: 'owoifies text... just try it.',
    cooldown: 0,
    category: "fun",
    use: "owoify",
    async execute(client, message, args, Discord, economy, util){
        if(!args[1]) return message.channel.send(`include what you want to translate!`)
        message.channel.send(owoify(args.slice(1).join(" ")))
    }
}