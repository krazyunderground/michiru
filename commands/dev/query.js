module.exports = {
    name: "query",
    category: "dev",
    use: "query <type>",
    description: "test how long a database query will take.",
    cooldown: 0,
    minArgs: 0,
    maxArgs: 1,
    async execute(client, message, args, Discord) {
        if(!client.guilds.cache.get("848707853350862858").members.cache.get(message.member.user.id).roles.cache.has("854061604258054214")) return message.reply("This command is for devs only! *If you're having issues, please let us know in the support server. https://discord.com/invite/E9BnSJHWSK*")
        if(!args[1] || args[1] === "all") {
            const start = Date.now()
            const data = await client.functions.get("guildCheck").execute(message);
            const econ = await client.functions.get("getUserEcon").execute(message.member);
            const util = await client.functions.get("getUserUtil").execute(message.member);
            const cc = await client.functions.get("ccCheck").execute(message);
            const end = Date.now()
            const total = end - start
            message.reply(`Mass query took ${total}ms to complete.`)
        }
        if(args[1] === "econ") {
            const start = Date.now()
            const settings = await client.functions.get("getUserEcon").execute(message.member);
            const end = Date.now()
            const total = end - start
            message.channel.send(`User econ query took ${total}ms to complete.`)
        }
        if(args[1] === "data") {
            const start = Date.now()
            const data = await client.functions.get("guildCheck").execute(message);
            const end = Date.now()
            const total = end - start
            message.channel.send(`Guild data query took ${total}ms to complete.`)
        }
        if(args[1] === "util") {
            const start = Date.now()
            const data = await client.functions.get("getUserUtil").execute(message.member);
            const end = Date.now()
            const total = end - start
            message.channel.send(`User util query took ${total}ms to complete.`)
        }
        if(args[1] === "cc") {
            const start = Date.now()
            const data = await client.functions.get("ccCheck").execute(message);
            const end = Date.now()
            const total = end - start
            message.channel.send(`Custom Command query took ${total}ms to complete.`)
        }
    }
}