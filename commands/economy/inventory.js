module.exports = {
    name: "inventory",
    aliases: ["inv"],
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/inventory.js",
    category: "eco",
    use: "inventory",
    cooldown: 1,
    maxArgs: 0,
    description: "allows the user to check their item inventory.",
    async execute(client, message, args, Discord, economy, util) {
        const userecon = await client.functions.get("getAuthorEcon").execute(message)
        const userutil = await client.functions.get("getUtil").execute(message)
        owns = userecon.owns.split(" ")
        ownsf = []
        owns.forEach(item => {
            if(item.endsWith("h")){
                ownsf.push(`\`${item.slice(0, -1)} helmet\``)
            }
            if(item.endsWith("c")){
                ownsf.push(`\`${item.slice(0, -1)} chestplate\``)
            }
            if(item.endsWith("l")){
                ownsf.push(`\`${item.slice(0, -1)} leggings\``)
            }
            if(item.endsWith("b")){
                ownsf.push(`\`${item.slice(0, -1)} boots\``)
            }
            if(item.endsWith("s")){
                ownsf.push(`\`${item.slice(0, -1)} sword\``)
            }
        })
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.author.username}'s Inventory!`)
            .setDescription(ownsf.join(", "))
            .setColor(userutil.colour)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())

        message.channel.send({embeds: [embed]})
    }
}