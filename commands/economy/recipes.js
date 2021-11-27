const Discord = require("discord.js");
module.exports = {
    name: "recipes",
    category: "eco",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/recipes.js",
    use: "!m recipes",
    aliases: ['recipe', 'rec', 'recipebook'],
    cooldown: 2,
    description: "displays the recipe book",
    maxArgs: 0,
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message);
        const alloys = [
            {
                name: "Steel",
                recipe: "\`100 iron\` + \`80 tungsten\`",
                emoji: "<:Steel:914215785851920394>"
            },
            {
                name: "Magnite",
                recipe: "\`250 iron\` + \`100 gold\`",
                emoji: "<:Magnite:914215828415737936>"
                
            },
            {
                name: "Elgiloy",
                recipe: "\`500 iron\` + \`80 cobalt\`",
                emoji: "<:Elgiloy:914215874955714601>"
            },
            {
                name: "Shakudo",
                recipe: "\`250 gold\` + \`100 copper\`",
                emoji: "<:Shakudo:914215926948331582>"
            },
            {
                name: "Stellite",
                recipe: "\`250 cobalt\` + \`500 tungsten\`",
                emoji: "<:Stellite:914215990332624946>"
            },
            {
                name: "Cobium",
                recipe: "\`500 cobalt\` + \`800 copper\`",
                emoji: "<:Cobium:914216058586554469>"
            },
            {
                name: "Dymalloy",
                recipe: "\`750 cobalt\` + \`250 diamond\`",
                emoji: "<:Dymalloy:914216104694517892>"
            },
            {
                name: "Vitallium",
                recipe: "\`500 diamond\` + \`1000 cobalt\`",
                emoji: "<:Vitallium:914216146905997322>"
            },
        ]
        const alloyEmbed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
        .setTitle("Craftable Recipes")
        .setDescription("Use `!m craft <alloy>` to craft an alloy!")
        .setColor(userutil.colour)
        .setTimestamp()
        .setFooter("💸", client.user.displayAvatarURL())
        for (alloy of alloys) {
            alloyEmbed.addField(`${alloy.emoji} ${alloy.name}`, `Cost: ${alloy.recipe}`)
        }
        message.channel.send({embeds: [alloyEmbed]})
    }
}
