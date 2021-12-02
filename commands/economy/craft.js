const userEcon = require("../../models/userEcon")

module.exports = {
    name: "craft",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/craft.js",
    category: "eco",
    use: "craft <category> <item>",
    example: "!m craft armor steel helmet",
    cooldown: 1,
    description: "allows the user to craft items.",
    minArgs: 2,
    maxArgs: 3,
    async execute(client, message, args, Discord, economy, util) {
          if (message.guild === null) return message.reply(`You can't use this command in a DM!`);
  
          const userecon = await client.functions.get("getTargetEcon").execute(message);
          const userutil = await client.functions.get("getUtil").execute(message);

          const categories = { 
              //armor category
              armor: {
                steelhelmet: {
                    name: "steel helmet",
                    db: "steelh",
                    alloy: "steel",
                    cost: 5,
                },
                steelchestplate: {
                    name: "steel chestplate",
                    db: "steelc",
                    alloy: "steel",
                    cost: 5,
                },
                steelleggings: {
                  name: "steel leggings",
                    db: "steell",
                    alloy: "steel",
                    cost: 5,
                },
                steelboots: {
                  name: "steel boots",
                    db: "steelb",
                    alloy: "steel",
                    cost: 5,
                },
                  magnitehelmet: {
                      name: "magnite helmet",
                      db: "magniteh",
                      alloy: "magnite",
                      cost: 5,
                  },
                  magnitechestplate: {
                      name: "magnite",
                      db: "magnitec",
                      alloy: "magnite",
                      cost: 5,
                  },
                  magniteleggings: {
                    name: "magnite",
                      db: "magnitel",
                      alloy: "magnite",
                      cost: 5,
                  },
                  magniteboots: {
                      name: "magnite",
                      db: "magniteb",
                      alloy: "magnite",
                      cost: 5,
                  },
                  elgiloyhelmet: {
                    name: "",
                      db: "elgiloyh",
                      alloy: "elgiloy",
                      cost: 1,
                  },
                  elgiloychestplate: {
                      name: "",
                      db: "elgiloyc",
                      alloy: "elgiloy",
                      cost: 1,
                  },
                  elgiloyleggings: {
                      name: "",
                      db: "elgiloyl",
                      alloy: "elgiloy",
                      cost: 1,
                  },
                  elgiloyboots: {
                      name: "",
                      db: "elgiloyb",
                      alloy: "elgiloy",
                      cost: 1,
                  },
                  shakudohelmet: {
                      name: "",
                      db: "shakudoh",
                      alloy: "shakudo",
                      cost: 1,
                  },
                  shakudochestplate: {
                      name: "",
                      db: "shakudoc",
                      alloy: "shakudo",
                      cost: 1,
                  },
                  shakudoleggings: {
                      name: "",
                      db: "shakudol",
                      alloy: "shakudo",
                      cost: 1,
                  },
                  shakudoboots: {
                      name: "",
                      db: "shakudob",
                      alloy: "shakudo",
                      cost: 1,
                  },
                  stellitehelmet: {
                      name: "",
                      db: "stelliteh",
                      alloy: "stellite",
                      cost: 1,
                  },
                  stellitechestplate: {
                      name: "",
                      db: "stellitec",
                      alloy: "stellite",
                      cost: 1,
                  },
                  stelliteleggings: {
                      name: "",
                      db: "stellitel",
                      alloy: "stellite",
                      cost: 1,
                  },
                  stelliteboots: {
                      name: "",
                      db: "stelliteb",
                      alloy: "stellite",
                      cost: 1,
                  },
                  cobiumhelmet: {
                      name: "",
                      db: "cobiumh",
                      alloy: "cobium",
                      cost: 1,
                  },
                  cobiumchestplate: {
                      name: "",
                      db: "cobiumc",
                      alloy: "cobium",
                      cost: 1,
                  },
                  cobiumleggings: {
                      name: "",
                      db: "cobiuml",
                      alloy: "cobium",
                      cost: 1,
                  },
                  cobiumboots: {
                      name: "",
                      db: "cobiumb",
                      alloy: "cobium",
                      cost: 1,
                  },
                  dymalloyhelmet: {
                      name: "",
                      db: "dymalloyh",
                      alloy: "dymalloy",
                      cost: 1,
                  },
                  dymalloychestplate: {
                      name: "",
                      db: "dymalloyc",
                      alloy: "dymalloy",
                      cost: 1,
                  },
                  dymalloyleggings: {
                      name: "",
                      db: "dymalloyl",
                      alloy: "dymalloy",
                      cost: 1,
                  },
                  dymalloyboots: {
                      name: "",
                      db: "dymalloyb",
                      alloy: "dymalloy",
                      cost: 1,
                  },
                  vitalliumhelmet: {
                      name: "vitallium ",
                      db: "vitalliumh",
                      alloy: "vitallium",
                      cost: 1,
                  },
                  vitalliumchestplate: {
                      name: "vitallium ",
                      db: "vitalliumc",
                      alloy: "vitallium",
                      cost: 1,
                  },
                  vitalliumleggings: {
                      name: "vitallium ",
                      db: "vitalliuml",
                      alloy: "vitallium",
                      cost: 1,
                  },
                  vitalliumboots: {
                      name: "vitallium ",
                      db: "vitalliumb",
                      alloy: "vitallium",
                      cost: 1,
                  }
              },
              //weapons category
              weapons: {
                steelsword: {
                    db: "steels",
                    alloy: "steel",
                    cost: 5,
                },
                  magnitesword: {
                      db: "magnites",
                      alloy: "magnite",
                      cost: 1,
                  },
                  elgiloysword: {
                      db: "elgiloys",
                      alloy: "elgiloy",
                      cost: 1,
                  },
                  shakudosword: {
                      db: "shakudos",
                      alloy: "shakudo",
                      cost: 1,
                  },
                  stellitesword: {
                      db: "stellites",
                      alloy: "stellite",
                      cost: 1,
                  },
                  cobiumsword: {
                      db: "cobiums",
                      alloy: "cobium",
                      cost: 1,
                  },
                  dymalloysword: {
                      db: "dymalloys",
                      alloy: "dymalloy",
                      cost: 1,
                  },
                  vitalliumsword: {
                      db: "vitalliums",
                      alloy: "vitallium",
                      cost: 1,
                  }
              }
          };
          if(!args[3]) args[3] = ""
          const query =`${args[2]}${args[3]}`
          if(!args[1]) return message.channel.send("Include which category of item you want to craft")
          let category;
          if(args[1] === "armour") {
              category = "armor"
          } else {
              category = args[1]
          }
          if(!args[2]) return message.channel.send("Include what you want to craft!")
          if(!categories[category]) return message.channel.send("That category doesnt exist!")
          if(!categories[category][query]) return message.channel.send("That item doesnt exist!")
          const request = categories[category][query]

          if(userecon.owns.includes(request.db))return message.reply("You already have that item!")

          const alloy = request.alloy
          const cost = request.cost
		if (userecon.alloyInv === "") {
			alloyInv = ["steel@0", "magnite@0", "elgiloy@0", "shakudo@0", "stellite@0", "cobium@0", "dymalloy@0", "vitallium@0"]
		} else {
			alloyInv = userecon.alloyInv.split(" ");
        }

        const steel = alloyInv[0].split("@");
		const magnite = alloyInv[1].split("@");
		const elgiloy = alloyInv[2].split("@");
		const shakudo = alloyInv[3].split("@");
		const stellite = alloyInv[4].split("@");
		const cobium = alloyInv[5].split("@");
		const dymalloy = alloyInv[6].split("@");
		const vitallium = alloyInv[7].split("@");

		//make sure they request an item
		if (!args[1])return message.channel.send("please enter an item to craft. '!m recipes to view the recipe book'");
		//set the request

		//set price and amount after give
        newmagn=parseInt(magnite[1])
        newstel=parseInt(steel[1])
        newelgi=parseInt(elgiloy[1])
        newshak=parseInt(shakudo[1])
        newstet=parseInt(stellite[1])
        newcobi=parseInt(cobium[1])
        newdyma=parseInt(dymalloy[1])
        newvita=parseInt(vitallium[1])
		switch (request.alloy) {
			case "magnite":
				newmagn = parseInt(magnite[1]) - request.cost
				break;
			case "steel":
				newstel = parseInt(steel[1]) - request.cost
				break;
			case "elgiloy":
				newelgi = parseInt(elgiloy[1]) - request.cost
				break;
			case "shakudo":
				newshak = parseInt(shakudo[1]) - request.cost
				break;
			case "stellite":
				newstet = parseInt(stellite[1]) - request.cost
				break;
			case "cobium":
				newcobi = parseInt(cobium[1]) - request.cost
				break;
			case "dymalloy":
				newdyma = parseInt(dymalloy[1]) - request.cost
				break;
			case "vitallium":
				newvita = parseInt(vitallium[1]) - request.cost
				break;
		}
		//verify they can afford the item
		if (newmagn < 0) return message.reply("You don't have enough magnite!");

		if (newstel < 0) return message.reply("You don't have enough steel!");

		if (newelgi < 0) return message.reply("You don't have enough eligoy!");

		if (newshak < 0) return message.reply("You don't have enough shakudo!");

		if (newstel < 0) return message.reply("You don't have enough stellite!");

		if (newcobi < 0) return message.reply("You don't have enough cobium!");

        if (newdyma < 0) return message.reply("You don't have enough dymalloy!");

        if (newvita < 0) return message.reply("You don't have enough vitallium!");
		//set new ore inventory from switch case prices
		const newalloyInv = `steel@${newstel} magnite@${newmagn} elgiloy@${newelgi} shakudo@${newshak} stellite@${newstet} cobium@${newcobi} dymalloy@${newdyma} vitallium@${newvita}`
		//update econ
		await userEcon.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                $set:{
                    alloyInv: newalloyInv,
                }
            }
        )

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.author.username} Crafted an Item!`)
            .setDescription(`**Purchase:** \`${args[2]} ${args[3]}\`\n**Alloy:** \`${alloy}\`\n**Cost:** \`${cost}\``)
            .setColor(userutil.colour)
            .setTimestamp()
            .setFooter("💸", client.user.displayAvatarURL())

        message.channel.send({embeds: [embed]})

        await userEcon.findOneAndUpdate(
            {
              userID: message.author.id
            },
            {
                $set: {
                    owns: `${userecon.owns} ${request.db}`
                }
            }
          )
      },
  };
  