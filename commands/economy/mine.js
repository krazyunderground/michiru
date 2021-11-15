const Discord = require("discord.js")
const userEcon = require("../../models/userEcon")
module.exports = {
    name: "mine",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/mine.js",
    category: "eco",
    use: "!m mine",
    aliases: ['work', 'm', 'w'],
    cooldown: 1,
    description: "allows the user to get more materials",
    async execute(client, message, args, Discord, economy, util){
        if(message.guild === null) return message.reply("You can't use this command in a DM!")

        const userecon = await client.functions.get("getAuthorEcon").execute(message);
        const userutil = await client.functions.get("getUtil").execute(message);

        const pick = userecon.pick

        //sets parameters for the algorithm

        switch(pick){
            case 1:
                var ores = [["iron", 900, 20, 40],["tungsten", 500, 10, 30],["gold", 100, 5, 15],["copper", 10, 3, 7],["cobalt", 0, 0, 0],["diamond", 0, 0, 0]] // ID, chance * 10, min quant, max quant
                var pickaxe = "iron"
            break
            case 2:
                var ores = [["iron", 500, 10, 30],["tungsten", 900, 20, 40],["gold", 500, 10, 30],["copper", 100, 0, 15],["cobalt", 25, 1, 3],["diamond", 0, 0, 0]] // ID, chance * 10, min quant, max quant
                var pickaxe = "tungsten"
            break
            case 3:
                var ores = [["iron", 250, 1, 15],["tungsten", 500, 10, 30],["gold", 900, 20, 40],["copper", 500, 10, 30],["cobalt", 50, 1, 15],["diamond", 10, 1, 3]] // ID, chance * 10, min quant, max quant
                var pickaxe = "gold"
            break
            case 4:
                var ores = [["iron", 100, 1, 15],["tungsten", 300, 20, 30],["gold", 500, 20, 40],["copper", 900, 30, 50],["cobalt", 250, 10, 30],["diamond", 100, 1, 15]] // ID, chance * 10, min quant, max quant
                var pickaxe = "copper"
            break
            case 5:
                var ores = [["iron", 50, 1, 15],["tungsten", 250, 20, 40],["gold", 300, 30, 50],["copper", 500, 35, 60],["cobalt", 900, 20, 40],["diamond", 250, 10, 30]] // ID, chance * 10, min quant, max quant
                var pickaxe = "cobalt"
            break
            case 6:
                var ores = [["iron", 50, 1, 20],["tungsten", 300, 20, 40],["gold", 700, 30, 50],["copper", 100, 35, 60],["cobalt", 15, 25, 50],["diamond", 500, 20, 50]] // ID, chance * 10, min quant, max quant
                var pickaxe = "diamond"
            break
        }

        //algorithm decides how much of what based on the parameters

        var mined = new Array()
        ores.forEach(ore =>{
            function randomInt(min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            }

            var totals = new Array()

            const chance = randomInt(1, 1000)
            var total1 = randomInt(1, 1000-ore[1]) + ((randomInt(1, ore[1]-1000))*-1)
            var total2 = total1 + ore[1]

            var sub = randomInt(1, ore[1])

            if(total2 > 1000) total1 = (total1 - (total2-1000)) - sub; total2 = (total2 - (total2-1000)) - sub

            totals.push(total1)
            totals.push(total2)
            
            totalsSorted = totals.sort((a, b) => a - b)

            const quantity = randomInt(ore[2], ore[3])

            const totalMined = [ore[0], quantity]

            if(totalsSorted[0] <= chance && chance <= totalsSorted[1]) mined.push(totalMined.join("@"))
        })

        var addIron = 0
        var addTung = 0
        var addGold = 0
        var addCopp = 0
        var addColb = 0
        var addDiam = 0

        //for each ore its split into seperate variables

        mined.forEach(ore => {
            const ans = ore.split("@")
            switch(ans[0]){
                case "iron": 
                    addIron = ans[1]
                break
                case "tungsten": 
                    addTung = ans[1]
                break
                case "gold": 
                    addGold = ans[1]
                break
                case "copper": 
                    addCopp = ans[1]
                break
                case "cobalt": 
                    addColb = ans[1]
                break
                case "diamond": 
                    addDiam = ans[1]
                break  
            }
        })

        var oldOre

        //gets the old balance, or makes one

        if(userecon.oreInv === ""){
            oldOre = `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`
        } else {
            oldOre = userecon.oreInv
        }

        //splits the old balance into seperate variables

        var oldOreInv = oldOre.split(" ")

        var oldIron = oldOreInv[0].split("@")[1]
        var oldTung = oldOreInv[1].split("@")[1]
        var oldGold = oldOreInv[2].split("@")[1]
        var oldCopp = oldOreInv[3].split("@")[1]
        var oldColb = oldOreInv[4].split("@")[1]
        var oldDiam = oldOreInv[5].split("@")[1]

        //adds up the seperate variables

        var newIron = parseInt(oldIron) + parseInt(addIron)
        var newTung = parseInt(oldTung) + parseInt(addTung)
        var newGold = parseInt(oldGold) + parseInt(addGold)
        var newCopp = parseInt(oldCopp) + parseInt(addCopp)
        var newColb = parseInt(oldColb) + parseInt(addColb)
        var newDiam = parseInt(oldDiam) + parseInt(addDiam)

        //formats the new balance

        var newOreInv = `iron@${newIron} tungsten@${newTung} gold@${newGold} copper@${newCopp} cobalt@${newColb} diamond@${newDiam}`

        //saves the new balance

        await userEcon.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                $set: {
                    oreInv: newOreInv
                }
            }
        )

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName}'s Mining Expedition!`)
            .setColor(userutil.colour)

        if(addIron > 0){
            embed.addField("Iron", `<:iron:872597984989290537> \`${addIron}\` Gained!\nTotal: \`${oldIron} ==> ${newIron}\``)
        }
        if(addTung > 0){
            embed.addField("Tungsten", `<:tungsten:872598339005337672> \`${addTung}\` Gained!\nTotal: \`${oldTung} ==> ${newTung}\``)
        }
        if(addGold > 0){
            embed.addField("Gold", `<:gold:872600131025911819> \`${addGold}\` Gained!\nTotal: \`${oldGold} ==> ${newGold}\``)
        }
        if(addCopp > 0){
            embed.addField("Copper", `<:copper:872600271849680927> \`${addCopp}\` Gained!\nTotal: \`${oldCopp} ==> ${newCopp}\``)
        }
        if(addColb > 0){
            embed.addField("Cobalt", `<:cobalt:872604058010124318> \`${addColb}\` Gained!\nTotal: \`${oldColb} ==> ${newColb}\``)
        }
        if(addDiam > 0){
            embed.addField("Diamond", `<:diamond:872606034307448912> \`${addDiam}\` Gained!\nTotal: \`${oldDiam} ==> ${newDiam}\``)
        }

        if(addIron == 0 && addTung == 0 && addGold == 0 && addCopp == 0 && addColb == 0 && addDiam == 0) embed.setDescription(`No ores found :^(`)

        message.channel.send({embeds: [embed]})
    }
}