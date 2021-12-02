module.exports = {
    name: "progress",
    description: "make a progress bar",
    category: "dev",
    use: "progress <percent> <max> <size>",
    cooldown: 0,
    minArgs: 3,
    maxArgs: 3,
    async execute(client, message, args, Discord, economy, util){
        const value = args[1]
        const max = args[2]
        const size = args[3]

        const percent = value / max
        const progress = Math.round((size * percent))
        const empty = size - progress
        
        const progressText = '█'.repeat(progress);
        const emptyProgressText = '—'.repeat(empty);
        const percentageText = Math.round(percent * 100) + '%';
        const bar = '```[' + progressText + emptyProgressText + ']' + percentageText + '```';
        
        const userutil = await client.functions.get("getUtil").execute(message)

        const embed = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle('Trickle Balancing Changes')
        .setDescription(bar)
        .setTimestamp()

        client.guilds.cache.get("848707853350862858").channels.cache.get('853961166347042827').messages.fetch('916040859005370370').then(message => message.edit({ embeds: [embed] }))
        
    }
}