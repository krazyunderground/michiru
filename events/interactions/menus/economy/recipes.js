module.exports = {
    name: 'recipes',
    async execute(interaction, client, Discord) {
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
        const gears = [
            {
                name: "Steel Gear",
                recipe: "\`5\` Steel Per Piece",
                emoji: "<:SteelChestplate:916658150315282493>"
            },
            {
                name: "Magnite Gear",
                recipe: "\`10\` Magnite Per Piece",
                emoji: "<:MagniteChestplate:916660199023079504>"
                
            },
            {
                name: "Elgiloy Gear",
                recipe: "\`15\` Elgiloy Per Piece",
                emoji: "<:ElgiloyChestplate:916660242698362940>"
            },
            {
                name: "Shakudo Gear",
                recipe: "\`20\` Shakudo Per Piece",
                emoji: "<:ShakudoChestplate:916660253125386300>"
            },
            {
                name: "Stellite Gear",
                recipe: "\`25\` Stellite Per Piece",
                emoji: "<:StelliteChestplate:916660281269166111>"
            },
            {
                name: "Cobium Gear",
                recipe: "\`50\` Cobium Per Piece",
                emoji: "<:CobiumChestplate:916660288500158475>"
            },
            {
                name: "Dymalloy Gear",
                recipe: "\`75\` Dymalloy Per Piece",
                emoji: "<:DymalloyChestplate:916660335732211722>"
            },
            {
                name: "Vitallium Gear",
                recipe: "\`100\` Vitallium Per Piece",
                emoji: "<:VitalliumChestplate:916660343445528577>"
            },
        ]
        const userutil = await client.functions.get("getUserUtil").execute(interaction.member);
        const alloyEmbed = await new Discord.MessageEmbed()
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
        .setTitle("Alloy Recipes")
        .setDescription("Use `!m smelt <alloy>` to smelt an alloy!")
        .setColor(userutil.colour)
        .setTimestamp()
        .setFooter("💸", client.user.displayAvatarURL())
        for (const alloy of alloys) {
            alloyEmbed.addField(`${alloy.emoji} ${alloy.name}`, `Cost: ${alloy.recipe}`)
        }

        const gearEmbed = await new Discord.MessageEmbed()
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
        .setTitle("Gear Recipes")
        .setDescription("Use `!m craft <category> <item>` to craft an item!")
        .setColor(userutil.colour)
        .setTimestamp()
        .setFooter("💸", client.user.displayAvatarURL())
        for (const gear of gears) {
            gearEmbed.addField(`${gear.emoji} ${gear.name}`, `Cost: ${gear.recipe}`)
        }

        switch(interaction.values[0]) {
            case "Option 1":
                interaction.reply({embeds: [alloyEmbed], ephemeral: true})
            break;
            case "Option 2":
                interaction.reply({ embeds: [gearEmbed], ephemeral: true})
            break;
        }
    }
}