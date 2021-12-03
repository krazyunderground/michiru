const Discord = require("discord.js");
module.exports = {
    name: "recipes",
    category: "eco",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/recipes.js",
    use: "recipes",
    aliases: ['recipe', 'rec', 'recipebook'],
    cooldown: 5,
    description: "displays the recipe book",
    maxArgs: 0,
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message);
        const alloys = [
            {
                name: "Steel",
                recipe: "\`50 iron\` + \`35 tungsten\`",
                emoji: "<:Steel:914215785851920394>"
            },
            {
                name: "Magnite",
                recipe: "\`100 iron\` + \`50 gold\`",
                emoji: "<:Magnite:914215828415737936>"
                
            },
            {
                name: "Elgiloy",
                recipe: "\`250 iron\` + \`10 cobalt\`",
                emoji: "<:Elgiloy:914215874955714601>"
            },
            {
                name: "Shakudo",
                recipe: "\`250 gold\` + \`100 copper\`",
                emoji: "<:Shakudo:914215926948331582>"
            },
            {
                name: "Stellite",
                recipe: "\`100 cobalt\` + \`250 tungsten\`",
                emoji: "<:Stellite:914215990332624946>"
            },
            {
                name: "Cobium",
                recipe: "\`150 cobalt\` + \`250 copper\`",
                emoji: "<:Cobium:914216058586554469>"
            },
            {
                name: "Dymalloy",
                recipe: "\`250 cobalt\` + \`100 diamond\`",
                emoji: "<:Dymalloy:914216104694517892>"
            },
            {
                name: "Vitallium",
                recipe: "\`250 diamond\` + \`500 cobalt\`",
                emoji: "<:Vitallium:914216146905997322>"
            },
        ]
        const alloyEmbed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
        .setTitle("Alloy Recipes")
        .setDescription("Use `!m smelt <alloy>` to smelt an alloy!")
        .setColor(userutil.colour)
        .setTimestamp()
        .setFooter("💸", client.user.displayAvatarURL())
        for (alloy of alloys) {
            alloyEmbed.addField(`${alloy.emoji} ${alloy.name}`, `Cost: ${alloy.recipe}`)
        }
        message.channel.send({embeds: [alloyEmbed]})
    }
}
