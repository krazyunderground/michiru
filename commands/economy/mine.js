const Discord = require("discord.js")
const userEcon = require("../../models/userEcon")
module.exports = {
    name: "mine",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/mine.js",
    category: "eco",
    use: "mine",
    aliases: ['work', 'm', 'w'],
    cooldown: 10,
    description: "go on a mining expedition for some ores",
    maxArgs: 0,
    async execute(client, message, args, Discord, economy, util){
        if(message.guild === null) return message.reply("You can't use this command in a DM!")

        async function refresh(message){
            return await client.functions.get("getAuthorEcon").execute(message)
        }
        
        const userpick = await refresh(message)
        /* const userecon = await client.functions.get("getAuthorEcon").execute(message); */
        const userutil = await client.functions.get("getUtil").execute(message);
        const pick = userpick.pick
        //sets parameters for the algorithm

        switch(pick){
            case 1:
                var ores = [["iron", 900, 10, 30],["tungsten", 500, 5, 30],["gold", 100, 3, 10],["copper", 10, 1, 5],["cobalt", 0, 0, 0],["diamond", 0, 0, 0]] // ID, chance * 10, min quant, max quant
                var pickaxe = "starter"
            break
            case 2:
                var ores = [["iron", 500, 10, 30],["tungsten", 900, 15, 35],["gold", 600, 5, 20],["copper", 300, 3, 10],["cobalt", 25, 1, 3],["diamond", 0, 0, 0]] // ID, chance * 10, min quant, max quant
                var pickaxe = "steel"
            break
            case 3:
                var ores = [["iron", 250, 5, 25],["tungsten", 400, 10, 20],["gold", 900, 10, 25],["copper", 400, 5, 20],["cobalt", 50, 1, 8],["diamond", 5, 1, 2]] // ID, chance * 10, min quant, max quant
                var pickaxe = "magnite"
            break
            case 4:
                var ores = [["iron", 100, 3, 15],["tungsten", 300, 5, 15],["gold", 400, 8, 20],["copper", 900, 10, 25],["cobalt", 100, 3, 8],["diamond", 10, 1, 5]] // ID, chance * 10, min quant, max quant
                var pickaxe = "elgiloy"
            break
            case 5:
                var ores = [["iron", 100, 3, 10],["tungsten", 250, 8, 15],["gold", 400, 18, 22],["copper", 600, 20, 25],["cobalt", 350, 8, 12],["diamond", 100, 3, 8]] // ID, chance * 10, min quant, max quant
                var pickaxe = "shakudo"
            break
            case 6:
                var ores = [["iron", 100, 3, 10],["tungsten", 150, 8, 15],["gold", 300, 15, 18],["copper", 450, 18, 20],["cobalt", 400, 8, 12],["diamond", 100, 5, 8]] // ID, chance * 10, min quant, max quant
                var pickaxe = "stellite"
            break
            case 7:
                var ores = [["iron", 50, 1, 8],["tungsten", 150, 3, 8],["gold", 250, 5, 8],["copper", 350, 8, 15],["cobalt", 500, 12, 18],["diamond", 230, 3, 12]] // ID, chance * 10, min quant, max quant
                var pickaxe = "cobium"
            break
            case 8:
                var ores = [["iron", 50, 1, 8],["tungsten", 150, 3, 10],["gold", 250, 5, 12],["copper", 380, 10, 20],["cobalt", 750, 15, 20],["diamond", 380, 12, 15]] // ID, chance * 10, min quant, max quant
                var pickaxe = "dymalloy"
            break
            case 9:
                var ores = [["iron", 50, 1, 8],["tungsten", 150, 5, 10],["gold", 280, 8, 12],["copper", 400, 20, 25],["cobalt", 900, 22, 25],["diamond", 450, 18, 22]] // ID, chance * 10, min quant, max quant
                var pickaxe = "vitallium"
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
        const userecon = await refresh(message)
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
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.author.username}'s Mining Expedition!`)
            .setColor(userutil.colour)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())

        if(addIron > 0){
            embed.addField("Iron", `<:iron:872597984989290537> \`${addIron}\` Gained!\nTotal: \`${oldIron} ➞ ${newIron}\``)
        }
        if(addTung > 0){
            embed.addField("Tungsten", `<:tungsten:872598339005337672> \`${addTung}\` Gained!\nTotal: \`${oldTung} ➞ ${newTung}\``)
        }
        if(addGold > 0){
            embed.addField("Gold", `<:gold:872600131025911819> \`${addGold}\` Gained!\nTotal: \`${oldGold} ➞ ${newGold}\``)
        }
        if(addCopp > 0){
            embed.addField("Copper", `<:copper:872600271849680927> \`${addCopp}\` Gained!\nTotal: \`${oldCopp} ➞ ${newCopp}\``)
        }
        if(addColb > 0){
            embed.addField("Cobalt", `<:cobalt:872604058010124318> \`${addColb}\` Gained!\nTotal: \`${oldColb} ➞ ${newColb}\``)
        }
        if(addDiam > 0){
            embed.addField("Diamond", `<:diamond:872606034307448912> \`${addDiam}\` Gained!\nTotal: \`${oldDiam} ➞ ${newDiam}\``)
        }

        if(addIron == 0 && addTung == 0 && addGold == 0 && addCopp == 0 && addColb == 0 && addDiam == 0) embed.setDescription(`No ores found!`)
        message.channel.send({embeds: [embed]})
    }
}