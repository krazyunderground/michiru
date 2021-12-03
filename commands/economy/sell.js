const Discord = require("discord.js")
const { MessageSelectMenu, MessageActionRow, MessageButton } = require(`discord.js`)
const userEcon = require("../../models/userEcon")

module.exports = {
    name: "sellore",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/sell.js",
    category: "eco",
    use: "sellore <ore> <amount> *or* sellore all",
    example: "!m sellore iron 40, tungsten 5. Can also use !m sellore all.",
    aliases: ['so','oresell', 'sell'],
    cooldown: 5,
    description: "allows the user to sell ores",
    minArgs: 1,
    maxArgs: -1,
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

        var ironsub = 0
        var tungsub = 0
        var goldsub = 0
        var coppsub = 0
        var colbsub = 0
        var diamsub = 0
        if (args[1] === "all") {
            var ironsub = parseInt(iron[1])
            var tungsub = parseInt(tung[1])
            var goldsub = parseInt(gold[1])
            var coppsub = parseInt(copp[1])
            var colbsub = parseInt(colb[1])
            var diamsub = parseInt(diam[1])
        }
        else
        {const statement = args.join(" ").slice(8).split(",")
        statement.forEach(state => {
            valore = state.split(" ")
            if(!valore[0].length) valore.shift()
            switch(valore[0]){
                case "iron":
                    ironsub = valore[1]
                break
                case "tungsten":
                    tungsub = valore[1]
                break
                case "gold":
                    goldsub = valore[1]
                break
                case "copper":
                    coppsub = valore[1]
                break
                case "cobalt":
                    colbsub = valore[1]
                break
                case "diamond":
                    diamsub = valore[1]
                break
            }
        })}
        
        var lacking = new Array()

        if(parseInt(iron[1]) < ironsub) lacking.push("iron")
        if(parseInt(tung[1]) < tungsub) lacking.push("tungsten")
        if(parseInt(gold[1]) < goldsub) lacking.push("gold")
        if(parseInt(copp[1]) < coppsub) lacking.push("copper")
        if(parseInt(colb[1]) < colbsub) lacking.push("cobalt")
        if(parseInt(diam[1]) < diamsub) lacking.push("diamond")
        
        if(lacking.length > 0) return message.reply(`You don't have enough \`${lacking.join(", ")}\`!`)

        const ironprice = 1
        const tungprice = 3
        const goldprice = 5
        const coppprice = 10
        const colbprice = 15
        const diamprice = 25

        var ironprof = ironsub * ironprice
        var tungprof = tungsub * tungprice
        var goldprof = goldsub * goldprice
        var coppprof = coppsub * coppprice
        var colbprof = colbsub * colbprice
        var diamprof = diamsub * diamprice

        const addprof = ironprof + tungprof + goldprof + coppprof + colbprof + diamprof
        const totprof = ironprof + tungprof + goldprof + coppprof + colbprof + diamprof + parseInt(userecon.coins)

        var newiron = parseInt(iron[1]) - ironsub
        var newtung = parseInt(tung[1]) - tungsub
        var newgold = parseInt(gold[1]) - goldsub
        var newcopp = parseInt(copp[1]) - coppsub
        var newcolb = parseInt(colb[1]) - colbsub
        var newdiam = parseInt(diam[1]) - diamsub

        const newinv = `iron@${newiron} tungsten@${newtung} gold@${newgold} copper@${newcopp} cobalt@${newcolb} diamond@${newdiam}`

        await userEcon.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                $set:{
                    coins: totprof,
                    oreInv: newinv
                }
            }
        )
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.author.username}'s Profits!`)
            .setDescription(`sold ores for \`${addprof}\` coins`)
            .setColor(userutil.colour)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())

        message.channel.send({embeds: [embed]})    
    }
}  