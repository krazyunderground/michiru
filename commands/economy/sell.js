const Discord = require("discord.js")
const { MessageSelectMenu, MessageActionRow, MessageButton } = require(`discord.js`)
const userEcon = require("../../models/userEcon")

module.exports = {
    name: "sellore",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/sell.js",
    category: "eco",
    use: "!m sellore iron@140",
    aliases: ['so','os','oresell'],
    cooldown: 1,
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

        var ironsub = 0
        var tungsub = 0
        var goldsub = 0
        var coppsub = 0
        var colbsub = 0
        var diamsub = 0

        const value = args.slice(2).join(" ");
            switch(args[1]){
                case "iron":
                    ironsub = value
                break
                case "tungsten":
                    tungsub = value
                break
                case "gold":
                    goldsub = value
                break
                case "copper":
                    coppsub = value
                break
                case "cobalt":
                    colbsub = value
                break
                case "diamond":
                    diamsub = value
                break
            }

        if(parseInt(iron[1]) < ironsub) return message.reply("You don't have enough iron!")
        if(parseInt(tung[1]) < tungsub) return message.reply("You don't have enough tungsten!")
        if(parseInt(gold[1]) < goldsub) return message.reply("You don't have enough gold!")
        if(parseInt(copp[1]) < coppsub) return message.reply("You don't have enough copper!")
        if(parseInt(colb[1]) < colbsub) return message.reply("You don't have enough cobalt!")
        if(parseInt(diam[1]) < diamsub) return message.reply("You don't have enough diamonds!")

        const ironprice = 10
        const tungprice = 30
        const goldprice = 50
        const coppprice = 100
        const colbprice = 200
        const diamprice = 500

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

        message.reply(`sold minerals for \`${addprof}\` coins`)
    }
}  