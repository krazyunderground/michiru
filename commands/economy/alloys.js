const Discord = require("discord.js")
const userEcon = require("../../models/userEcon")

module.exports = {
    name: "alloys",
    category: "eco",
    use: "!m alloyInv",
    aliases: ['ai','ainv'],
    cooldown: 20,
    description: "allows the user to check their inventory of alloys",
    async execute(client, message, args, Discord, economy, util){
        if(message.guild === null) return message.reply("You can't use this command in a DM!")
        const userecon = await client.functions.get("getTargetEcon").execute(message);
        const userutil = await client.functions.get("getUtil").execute(message)

        var alloyInv

        if(userecon.alloyInv === ""){
            alloyInv = `LG@0 TS@0 Elgiloy@0 Ronovel@0 Shakudo@0 CM@0 Stellite@0 MC@0 Dymalloy@0 Vitallium@0`
        } else {
            alloyInv = userecon.alloyInv.split(" ")
        }

        const LG = alloyInv[0].split("@")
        const TS = alloyInv[1].split("@")
        const Elgiloy = alloyInv[2].split("@")
        const Ronovel = alloyInv[3].split("@")
        const Shakudo = alloyInv[4].split("@")
        const CM = alloyInv[5].split("@")
        const Stellite = alloyInv[6].split("@")
        const MC = alloyInv[7].split("@")
        const Dymalloy = alloyInv[8].split("@")
        const Vitallium = alloyInv[9].split("@")

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName}'s Alloy Inventory!`)
            .setColor(userutil.colour)

            embed.addField("Light Gold", `<:iron:872597984989290537> \`${LG[1]}\``)

            embed.addField("Tool Steel", `<:tungsten:872598339005337672> \`${TS[1]}\``)

            embed.addField("Elgiloy", `<:gold:872600131025911819> \`${Elgiloy[1]}\``)

            embed.addField("Ronovel", `<:copper:872600271849680927> \`${Ronovel[1]}\``)

            embed.addField("Shakudo", `<:cobalt:872604058010124318> \`${Shakudo[1]}\``)

            embed.addField("Copper Matrix", `<:diamond:872606034307448912> \`${CM[1]}\``)

            embed.addField("Stellite", `<:iron:872597984989290537> \`${Stellite[1]}\``)

            embed.addField("Master Cobalt", `<:tungsten:872598339005337672> \`${MC[1]}\``)

            embed.addField("Dymalloy", `<:gold:872600131025911819> \`${Dymalloy[1]}\``)

            embed.addField("Vitallium", `<:copper:872600271849680927> \`${Vitallium[1]}\``)

        message.channel.send({embeds: [embed]})
    }
} 