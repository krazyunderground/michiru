module.exports = {
    name: "split",
    description: "saoul split command",
    category: "dev",
    use: "split <content>",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        let messageContent = args.slice(1).join(" ");
        const userutil = await client.functions.get("getUtil").execute(message)
        const embed = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle("New Split Created Here")
        .setDescription(messageContent)
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}