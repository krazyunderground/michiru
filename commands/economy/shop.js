const Discord = require("discord.js")

module.exports = {
    name: "shop",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/sell.js",
    aliases: ['s'],
    category: "eco",
    use: "shop",
    cooldown: 2,
    description: "displays the item shop",
    maxArgs: 0,
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message);

        const pickaxes = [
            {
                name: "Steel Pickaxe",
                emoji: "<:SteelPickaxe:914215803971309618>",
                rank: 2,
                cost: 1000
              },
              {
                name: "Magnite Pickaxe",
                emoji: "<:MagnitePickaxe:914215849227866135> ",
                rank: 3,
                cost: 5000
              },
              {
                name: "Elgiloy Pickaxe",
                emoji: "<:ElgiloyPickaxe:914215888742383727> ",  
                rank: 4,
                cost: 10000,
              },
              {
                name: "Shakudo Pickaxe",
                emoji: "<:ShakudoPickaxe:914215943335477309>",
                rank: 5,
                cost: 25000,
              },
              {
                name: "Stellite Pickaxe",
                emoji: "<:StellitePickaxe:914216018635796520> ",
                rank: 6,
                cost: 50000,
              },
              {
                name: "Cobium Pickaxe",
                emoji: "<:CobiumPickaxe:914216084482170891> ",
                rank: 7,
                cost: 100000,
              },
              {
                name: "Dymalloy Pickaxe",
                emoji: "<:DymalloyPickaxe:914216124093186108> ",
                rank: 8,
                cost: 250000,
              },
              {
                name: "Vitallium Pickaxe",
                emoji: "<:VitalliumPickaxe:914216162777264138>",
                rank: 9,
                cost: 500000,
              },
        ]
        const shopEmbed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle('Item Shop!')
            .setDescription("Use `!m buy <item>` to buy an item!")
            .setColor(userutil.colour)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())
            for (pick of pickaxes) {
                shopEmbed.addField(`${pick.emoji} ${pick.name}`, `Cost: ${pick.cost} coins \nRank: ${pick.rank}`)
            }
        message.channel.send({embeds: [shopEmbed]})
    }
}
