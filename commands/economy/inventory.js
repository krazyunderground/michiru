module.exports = {
    name: "inventory",
    aliases: ["inv"],
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/inventory.js",
    category: "eco",
    use: "inventory",
    cooldown: 5,
    maxArgs: 0,
    description: "displays the command users inventory.",
    async execute(client, message, args, Discord, economy, util) {
        const userecon = await client.functions.get("getAuthorEcon").execute(message)
        const userutil = await client.functions.get("getUtil").execute(message)
        owns = userecon.owns.split(" ")
        ownsf = []
        owns.forEach(item => {
            const tier = item.slice(0, 1)
            const id = item.slice(1, 2)
            let alloy;
            let piece;
            switch(tier) {
                case "1":
                    alloy = "Steel"
                break
                case "2":
                    alloy = "Magnite"
                break
                case "3":
                    alloy = "Elgiloy"
                break
                case "4":
                    alloy = "Shakudo"
                break
                case "5":
                    alloy = "Stellite"
                break
                case "6":
                    alloy = "Cobium"
                break
                case "7":
                    alloy = "Dymalloy"
                break
                case "8":
                    alloy = "Vitallium"
                break
            }
            switch(id) {
                case "h":
                    piece = "Helmet"
                break
                case "c":
                    piece = "Chestplate"
                break
                case "l":
                    piece = "Leggings"
                break
                case "b":
                    piece = "Boots"
                break
                case "s":
                    piece = "Sword"
                break
            }
            const fItem = alloy + " " + piece
            ownsf.push(fItem)
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
