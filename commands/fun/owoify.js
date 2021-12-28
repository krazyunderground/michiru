const owoify = require("owoify-js").default
module.exports = {
    name: 'owoify',
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/owoify.js",
    aliases: ["owo"],
    description: 'owoifies text... just try it.',
    cooldown: 0,
    category: "fun",
    use: "owoify",
    async execute(client, message, args, Discord){
        if(!args[1]) return message.reply(`include what you want to "translate"!`)
        message.reply(owoify(args.slice(1).join(" ")))
    }
}