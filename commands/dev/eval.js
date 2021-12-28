const fetch = require("node-fetch")
const { Util } = require("discord.js")

module.exports = {
    name: "eval",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/eval.js",
    description: "evaluates code sent by a dev",
    category: "dev",
    cooldown: 0,
    async execute(client, message, args, Discord){
        if(!client.guilds.cache.get("848707853350862858").members.cache.get(message.member.user.id).roles.cache.has("858502490022084648")) return message.reply("This command is for devs only!")
        try {
            const code = args.slice(1).join(" ");
            let evaled = eval(code);
       
            if (typeof evaled !== "string"){
                evaled = require("util").inspect(evaled);

                const sending = Util.splitMessage('response:\n'+evaled, { maxLength: 2000 })
                for(const text of sending){
                    message.reply(`\`\`\`js\n${text}\`\`\``)
                }
            }
                
            
        } catch (err) {
            message.reply(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
        }
    }
}