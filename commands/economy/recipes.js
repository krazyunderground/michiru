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

        const alloyEmbed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
        .setTitle("Alloy Recipes")
        .setDescription("Use `!m smelt <alloy>` to smelt an alloy!")
        .setColor(userutil.colour)
        .setTimestamp()
        .setFooter("💸 Page 1/2", client.user.displayAvatarURL())
        for (alloy of alloys) {
            alloyEmbed.addField(`${alloy.emoji} ${alloy.name}`, `Cost: ${alloy.recipe}`)
        }

        const gearEmbed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
        .setTitle("Gear Recipes")
        .setDescription("Use `!m craft <category> <item>` to craft an item!")
        .setColor(userutil.colour)
        .setTimestamp()
        .setFooter("💸 Page 2/2", client.user.displayAvatarURL())
        for (gear of gears) {
            gearEmbed.addField(`${gear.emoji} ${gear.name}`, `Cost: ${gear.recipe}`)
        }




        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('back')
                .setLabel('Back')
                .setStyle('SECONDARY')
                .setEmoji('◀️'),
            new Discord.MessageButton()
                .setCustomId('forward')
                .setLabel('Next')
                .setStyle('SECONDARY')
                .setEmoji('▶️'))

        let pages = [alloyEmbed, gearEmbed];
        let page = 0;

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
                .setCustomId("Selection")
                .setMaxValues(1)
                .addOptions([option1, option2])
        )

        let selectEmbed = new Discord.MessageEmbed()
        .setColor(userutil.colour).setTitle("Please select the page of the recipe book you'd like to visit")

        let menumsg = await message.channel.send({embeds: [selectEmbed], components: [menuRow]})

        async function menuselection(menu) {
            switch(menu.values[0]) {
                case "Option 1":
                    menu.reply({embeds: [alloyEmbed], components: [row], ephemeral: true})
                break;
                case "Option 2":
                    page = 1
                    menu.reply({ embeds: [gearEmbed], components: [row], ephemeral: true})
                break;
            }
        }
        var collector = menumsg.createMessageComponentCollector({time: 59000})
            collector.on("collect", (menu) => {
                if(menu.message.id == menumsg.id) {
                    if(menu.member.id == message.author.id) menuselection(menu)
                    else menu.reply({content: ":x: Only the message author can interact with the menu", ephemeral: true})
                }
            })

        const filter = i => i.user.id === message.author.id;
        const buttoncollector = message.channel.createMessageComponentCollector({
            filter,
            time: 59000
          });
          


        buttoncollector.on("collect", async (i) => {
            switch(i.customId){
                case "back":
                    page = page - 1 >= 0 ? --page : pages.length - 1;
                    await i.deferUpdate();
                    await i.editReply({ embeds: [pages[page]], components: [row] });
                break
                case "forward":
                    page = page + 1 < pages.length ? ++page : 0;
                    await i.deferUpdate();
                    await i.editReply({ embeds: [pages[page]], components: [row] });
                break
            }
        })
        buttoncollector.on("end", (i) => {
            return
        })
        collector.on("end", (i) =>{
            return
        })
    }
}
