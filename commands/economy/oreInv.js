const Discord = require("discord.js")
const userEcon = require("../../models/userEcon")

module.exports = {
    name: "oreinv",
    category: "eco",
    use: "!m oreinv",
    aliases: ['oi','oinv'],
    cooldown: 20,
    description: "allows the user to get more materials",
    async execute(client, message, args, Discord, economy, util){
        if(message.guild === null) return message.reply("You can't use this command in a DM!")
        const userecon = await client.functions.get("getTargetEcon").execute(message);
        const userutil = await client.functions.get("getUtil").execute(message)

        var oreInv

        if(userecon.oreInv === ""){
            oreInv = `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`
        } else {
            oreInv = userecon.oreInv.split(" ")
        }

        const iron = oreInv[0].split("@")
        const tung = oreInv[1].split("@")
        const gold = oreInv[2].split("@")
        const copp = oreInv[3].split("@")
        const colb = oreInv[4].split("@")
        const diam = oreInv[5].split("@")

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName}'s Ore Inventory!`)
            .setColor(userutil.colour)

            embed.addField("Iron", `<:iron:872597984989290537> \`${iron[1]}\``)

            embed.addField("Tungsten", `<:tungsten:872598339005337672> \`${tung[1]}\``)

            embed.addField("Gold", `<:gold:872600131025911819> \`${gold[1]}\``)

            embed.addField("Copper", `<:copper:872600271849680927> \`${copp[1]}\``)

            embed.addField("Cobalt", `<:cobalt:872604058010124318> \`${colb[1]}\``)

            embed.addField("Diamond", `<:diamond:872606034307448912> \`${diam[1]}\``)
        
        

        message.channel.send({embeds: [embed]})
    }
} 