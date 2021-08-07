const { MessageSelectMenu, MessageActionRow, MessageButton } = require(`discord.js`)
module.exports = {
    name: "recipes",
    category: "eco",
    use: "!m recipes",
    aliases: ['recipe', 'rec', 'recipebook'],
    cooldown: 2,
    description: "displays the recipe book",
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message);
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
        const alloys = [
            {
                name: "Light Gold",
                recipe: "5 iron, 1 gold",
                characteristics: "more malleable than iron but still quite weak",
                extras: "magnetic",
                debuffs: "very weak"
            },
            {
                name: "Tool Steel",
                recipe: "5 iron, 3 Tungsten",
                characteristics: "tough to break even at high temperatures",
                extras: "heat resistance and hardness",
                debuffs: "weak"
            },
            {
                name: "Elgiloy",
                recipe: "3 iron and  2 cobalt",
                characteristics: "extremely lightweight but hard to break material",
                extras: "speed and posion",
                debuffs: "weak"
            },
            {
                name: "Ronovel",
                recipe: "3 gold and 1 cobalt",
                characteristics: "Extremely tough but heavy material",
                extras: "hardness and poison",
                debuffs: "slight slowness"
            },
            {
                name: "Shakudo",
                recipe: "1 gold and  1 copper",
                characteristics: "Malleable but rough material",
                extras: "electric",
                debuffs: "low durability"
            },
            {
                name: "Copper Matrix",
                recipe: "3 copper and 2 tungsten",
                characteristics: "hard to break even at high temperatures but heavy",
                extras: "heat resistance and electric",
                debuffs: "slowness"
            },
            {
                name: "Stellite",
                recipe: "3 cobalt 1 tungsten",
                characteristics: "heavy but extremely tough material",
                extras: "hardness",
                debuffs: "slowness"
            },
            {
                name: "Master Cobalt",
                recipe: "5 cobalt and 2 copper",
                characteristics: "well rounded tough material",
                extras: "electric and poison",
                debuffs: "none"
            },
            {
                name: "Dymalloy",
                recipe: "3 cobalt 2 diamond",
                characteristics: "very tough material, less weight than pure diamond",
                extras: "posion and hardness",
                debuffs: "slight slowness"
            },
            {
                name: "Vitallium",
                recipe: "5 diamond and 3 cobalt",
                characteristics: "unbreakable material with only slight slowness",
                extras: "unbreaking and poison",
                debuffs: "slight slowness"
            },
        ]
        //pickaxes
        const pickaxeEmbed = new Discord.MessageEmbed()
            .setTitle("Pickaxes")
            .setDescription("Use `!m craft [item]` to craft an item!\nEach tier of pickaxe will give more higher tier ore and less of the lower tiers")
            .setColor(userutil.colour)
            for (pick of pickaxes) {
                pickaxeEmbed.addField(`${pick.name}`, `Cost: ${pick.cost} \nID: ${pick.id}`)
            }
            //alloys
            let aH = alloys.slice(0, alloys.length / 2)
            let aSH = alloys.slice(alloys.length / 2, alloys.length)
            //first half
            const alloyEmbed1 = new Discord.MessageEmbed()
            .setTitle("Alloys")
            .setDescription("Use `!m craft [item]` to craft an item!")
            .setColor(userutil.colour)
            .setFooter("page 1/2")
            for (alloy of aH) {
                alloyEmbed1.addField(`${alloy.name}`, `${alloy.characteristics} \n\`Cost:\` ${alloy.recipe}\n\`Extras:\` ${alloy.extras}\n\`Debuff:\` ${alloy.debuffs}`)
            }
            //second half
            const alloyEmbed2 = new Discord.MessageEmbed()
            .setTitle("Alloys")
            .setDescription("Use `!m craft [item]` to craft an item!")
            .setColor(userutil.colour)
            .setFooter("page 2/2")
            for (alloy of aSH) {
                alloyEmbed2.addField(`${alloy.name}`, `${alloy.characteristics} \n\`Cost:\` ${alloy.recipe}\n\`Extras:\` ${alloy.extras}\n\`Debuff:\` ${alloy.debuffs}`)     
            }

            const button1 = new MessageButton()
            .setCustomId("back")
            .setLabel("Back")
            .setStyle("DANGER");
          const button2 = new MessageButton()
            .setCustomId("next")
            .setLabel("Next")
            .setStyle("SUCCESS");
      
          let pages = [alloyEmbed1, alloyEmbed2];
          let buttons = [button1, button2];
          let page = 0;

            let option1 = {
                label: "Pickaxes",
                value: "Option 1",
                description: "Display pickaxe recipe book",
                emoji: "<:ironpickaxe:872548372974809088>"
            }
            let option2 = {
                label: "Alloys",
                value: "Option 2",
                description: "Display alloy recipe book",
                emoji: "<:iron:872597984989290537>"
            }
            let row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("Selection")
                    .setMaxValues(1)
                    .addOptions([option1, option2])
            )
            let selectEmbed = new Discord.MessageEmbed()
            .setColor(userutil.colour).setTitle("Please select the page of the recipe book you'd like to visit")

            let menumsg = await message.channel.send({embeds: [selectEmbed], components: [row]})

            async function menuselection(menu) {
                switch(menu.values[0]) {
                    case "Option 1": 
                        menu.reply({embeds: [pickaxeEmbed], ephemeral: true})
                    break;
                    case "Option 2": 
                        menu.reply({ embeds: [pages[page]], components: [row2] , ephemeral: true})
                    break;
                }
            }
            var collector = menumsg.createMessageComponentCollector({time: 60000})
            collector.on("collect", (menu) => {
                if(menu.message.id == menumsg.id) {
                    if(menu.member.id == message.author.id) menuselection(menu)
                    else menu.reply({content: ":x: Only the message author can interact with the menu", ephemeral: true})
                }
            })
            const row2 = new MessageActionRow().addComponents(buttons);
      
            const filter = (i) => i.user.id === message.author.id;
        
            const collector2 = message.channel.createMessageComponentCollector({
              filter,
              time: 15000,
            });
        
            collector2.on("collect", async (i) => {
              switch (i.customId) {
                case buttons[0].customId:
                    page = page > 0 ? --page : pages.length - 1;
                    await i.deferUpdate();
                    await i.editReply({ embeds: [pages[page]], components: [row2] });
                    break;
                case buttons[1].customId:
                  page = page + 1 < pages.length ? ++page : 0;
                  await i.deferUpdate();
                  await i.editReply({ embeds: [pages[page]], components: [row2] });
                  break;
              }
            });
        
            collector2.on("end", (i) => {
                const disabledRow = new MessageActionRow().addComponents(
                    buttons[0].setDisabled(true),
                    buttons[1].setDisabled(true)
                )
                    i.editReply( {embeds: [pages[page]], components: [disabledRow]} )
            })
    }
}
