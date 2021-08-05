module.exports = {
    name: "recipes",
    category: "eco",
    use: "!m recipes",
    aliases: ['recipe', 'rec', 'recipebook'],
    cooldown: 2,
    description: "displays the recipe book",
    async execute(client, message, Discord){
        const userutil = await client.funtions.get("getUtil").execute(message);
        const pickaxes = [
            {
                name: "tungsten pickaxe",
                cost: "1 tungsten",
                id: "`tungsten`"
            },
            {
                name: "gold pickaxe",
                cost: "1 gold",
                id: "`gold`"
            },
            {
                name: "copper pickaxe",
                cost: "1 copper",
                id: "`copper`"
            },
            {
                name: "cobalt pickaxe",
                cost: "1 cobalt",
                id: "`cobalt`"
            },
            {
                name: "diamond pickaxe",
                cost: "1 diamond",
                id: "`diamond`"
            },            
        ]
        const pickaxeEmbed = new Discord.MessageEmbed()
            .setTitle("Pickaxes")
            .setDescription("Use `!m buy [item]` to buy an item!\nEach tier of pickaxe will give more higher tier ore and less of the lower tiers")
            .setColor(userutil.colour)
            for (pick of pickaxes) {
                pickaxeEmbed.addField(`${pick.name}`, `${pick.description} \nCost: ${pick.cost} \nID: ${pick.id}`)
            }
        message.channel.send({embeds: [pickaxeEmbed]})
    }
}
