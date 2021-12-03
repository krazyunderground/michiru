module.exports = {
    name: "poll",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/moderation/poll.js",
    category: "admin",
    use: "poll",
    description: "creates a poll in the specified channel",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        const channel = message.mentions.channels.first()
        let messageContent = args.slice(2).join(" ");
        const reaction = await channel.send(messageContent)
        reaction.react('⬆️').then(reaction.react('⬇️'))
    }
}