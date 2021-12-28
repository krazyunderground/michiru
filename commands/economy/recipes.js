const Discord = require("discord.js");
module.exports = {
    name: "recipes",
    category: "eco",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/recipes.js",
    use: "recipes",
    aliases: ['rec'],
    cooldown: 60,
    description: "displays the recipe book.",
    maxArgs: 0,
    async execute(client, message, args, Discord){
        const userutil = await client.functions.get("getUserUtil").execute(message.member);

        let option1 = {
            label: "Alloy Recipes",
            value: "Option 1",
            description: "Display the alloy recipe book",
            emoji: "<:Steel:914215785851920394>"
        }
        let option2 = {
            label: "Gear Recipes",
            value: "Option 2",
            description: "Display the gear recipe book",
            emoji: "<:SteelChestplate:916658150315282493>"
        }

        let menuRow = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("recipes")
                .setMaxValues(1)
                .addOptions([option1, option2])
        )

        let selectEmbed = new Discord.MessageEmbed()
        .setColor(userutil.colour).setTitle("Please select the page of the recipe book you'd like to visit")

        message.reply({embeds: [selectEmbed], components: [menuRow]})
    }
}
