const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "eval",
    description: "evaluates code sent by a dev",
    category: "admin",
    use: "!m eval",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        if(message.author.id !== "576470929874616330") return message.reply("You can't use this!")
        try {
            const code = args.slice(1).join(" ");
            let evaled = eval(code);
       
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
       
            message.channel.send('response:\n'+evaled, {code:"xl", split: true});
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
        }
    }
}