const fetch = require("node-fetch")
const { Util } = require("discord.js")

module.exports = {
    name: "eval",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/eval.js",
    description: "evaluates code sent by a dev",
    category: "admin",
    cooldown: 0,
    async execute(client, message, args, Discord){
        if(message.author.id !== "576470929874616330") return message.reply("You can't use this!")
        try {
            const code = args.slice(1).join(" ");
            let evaled = eval(code);
       
            if (typeof evaled !== "string"){
                evaled = require("util").inspect(evaled);

                const sending = Util.splitMessage('response:\n'+evaled, { maxLength: 2000 })
                for(const text of sending){
                    message.channel.send(`\`\`\`js\n${text}\`\`\``)
                }
            }
                
            
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
        }
    }
}