const Discord = require("discord.js")
const userEcon = require("../../models/userEcon")
module.exports = {
    name: "buy",
    category: "eco",
    use: "!m buy",
    description: "allows the user to buy a new pick",
    cooldown: 2,
    async execute(client, message, args, Discord, economy){

        const userecon = await client.functions.get("getAuthorEcon").execute(message);
        const userutil = await client.funtions.get("getUtil").execute(message);

        const bal = userecon.coins
        const pick = userutil.pick

        if(!args[1]) return message.reply("Add what you want to buy!")

        switch(args[1]){
            case 'reinforced':
                if(pick >= 2) return message.reply("You already have a pickaxe just as good or better!")
                    if(bal >= 300){
                            await userEcon.findOneAndUpdate(
                                {
                                  userID: message.author.id,
                                },
                                {
                                  $inc: {
                                    quartz: -300
                                  },
                                })
                            await userEcon.findOneAndUpdate(
                                {
                                  userID: message.author.id,
                                },
                                {
                                  $set: {
                                    pick: 2,
                                    pickIMG: "https://cdn.discordapp.com/attachments/853961222520045598/856605307127857152/reinforced_pick.png"
                                }
                                })
                            message.channel.send("Purchase complete! Now go get some more quartz!")
                    } else {
                        message.reply("Insufficient funds!")
                    }

            break

            case 'elite':
                if(pick >= 3) return message.reply("You already have a pickaxe just as good or better!")
                if(bal >= 800){
                    await userEcon.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $inc: {
                            quartz: -800
                          },
                        })
                    await userEcon.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $set: {
                            pick: 3,
                            pickIMG: "https://cdn.discordapp.com/attachments/853961222520045598/856605370693058571/elite_pick.png"
                        }
                        })
                    message.channel.send("Done! Now go get some more quartz!")
                } else {
                    message.reply("Insufficient funds!")
                }

            break

            case 'pro':
                if(pick >= 4) return message.reply("You already have a pickaxe just as good or better!")
                if(bal >= 1500){
                    await userEcon.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $inc: {
                            quartz: -1500
                          },
                        })
                    await userEcon.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $set: {
                            pick: 4,
                            pickIMG: "https://cdn.discordapp.com/attachments/853961222520045598/856605417371336714/pro_pick.png"
                        }
                        })
                    message.channel.send("Done! Now go get some more quartz!")
                } else {
                    message.reply("Insufficient funds!")
                }

            break

            case 'epic':
                if(pick >= 5) return message.reply("You already have a pickaxe just as good or better!")
                if(bal >= 2700){
                    await userEcon.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $inc: {
                            quartz: -2700
                          },
                        })
                    await userEcon.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $set: {
                            pick: 5,    
                            pickIMG: "https://cdn.discordapp.com/attachments/853961222520045598/856605458457427968/epic_pick.png"
                        }
                        })                    
                    message.channel.send("Done! Now go get some more quartz!")
                } else {
                    message.reply("Insufficient funds!")
                }

            break

            case 'god':
                if(pick[0] >= 6) return message.reply("You already have a pickaxe just as good or better!")
                if(bal >= 4600){
                    await userEcon.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $inc: {
                            quartz: -4600
                          },
                        })
                    await userEcon.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $set: {
                            pick: 6,
                            pickIMG: "https://cdn.discordapp.com/attachments/853961222520045598/856605487494856704/god_pick.png"
                        }
                        })                    
                    message.channel.send("Done! Now go get some more quartz!")
                } else {
                    message.reply("Insufficient funds!")
                }

            break
        }
    }
}