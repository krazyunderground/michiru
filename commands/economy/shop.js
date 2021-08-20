const Discord = require("discord.js")

module.exports = {
    name: "shop",
    aliases: ['s'],
    category: "eco",
    use: "!m shop",
    cooldown: 2,
    description: "allows the user to buy a new pick",
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message);

        const pickaxes = [
            {
                name: "Reinforced Pickaxe",
                cost: 300,
                description: "<:reinforcedpick:856587877239488512> Extra 10% when mining",
                id: "`reinforced`"
            },
            {
                name: "Elite Pickaxe",
                cost: 800,
                description: "<:elitepick:856587945230336010> Extra 20% when mining",
                id: "`elite`"
            },
            {
                name: "Pro Pickaxe",
                cost: 1500,
                description: "<:propick:856588067556556841> Extra 50% when mining",
                id: "`pro`"
            },
            {
                name: "Epic Pickaxe",
                cost: 2700,
                description: "<:epicpick:856588001844920331> Extra 100% when mining",
                id: "`epic`"
            },
            {
                name: "God Pickaxe",
                cost: 4600,
                description: "<:godpick:856588141497679899> Extra 200% when mining",
                id: "`god`"
            }
        ]
        const shopEmbed = new Discord.MessageEmbed()
            .setTitle("Shop")
            .setDescription("Use `!m buy [item]` to buy an item!")
            .setColor(userutil.colour)
            for (pick of pickaxes) {
                shopEmbed.addField(`${pick.name}`, `${pick.description} \nCost: ${pick.cost} \nID: ${pick.id}`)
            }
        message.channel.send({embeds: [shopEmbed]})
    }
}
