const Discord = require("discord.js")

module.exports = {
    name: "shop",
    aliases: ['s'],
    category: "eco",
    use: "!m shop",
    cooldown: 2,
    description: "allows the user to buy a new pick",
    execute(client, message, args, Discord, economy, util){
        const shopEmbed = new Discord.MessageEmbed()
            .setTitle("Shop")
            .setDescription("Use `!m buy [item]` to buy an item!")
            .addField("Reinforced Pickaxe", "<:reinforcedpick:856587877239488512> Extra 10% when mining \nCost: `300` \nID: `reinforced`")
            .addField("Elite Pickaxe", "<:elitepick:856587945230336010> Extra 20% when mining \nCost: `800` \nID: `elite`")
            .addField("Pro Pickaxe", "<:propick:856588067556556841> Extra 50% when mining \nCost: `1500` \nID: `pro`")
            .addField("Epic Pickaxe", "<:epicpick:856588001844920331> Extra 100% when mining \nCost: `2700` \nID: `epic`")
            .addField("God Pickaxe", "<:godpick:856588141497679899> Extra 200% when mining \nCost: `4600` \nID: `god`")
            .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))

        message.channel.send({embeds: [shopEmbed]})
    }
}