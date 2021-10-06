const userEcon = require("../../models/userEcon")

module.exports = {
    name: "craft",
    gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/craft.js",
    category: "eco",
    use: "!m craft",
    cooldown: 1,
    description: "allows the user to craft items.",
    async execute(client, message, args, Discord, economy, util) {
          if (message.guild === null) return message.reply(`You can't use this command in a DM!`);
  
          const userecon = await client.functions.get("getTargetEcon").execute(message);
          const userutil = await client.functions.get("getUtil").execute(message);

          const categories = { 
              //armor category
              armor: {
                  magnitehelmet: {
                      name: "magnite helmet",
                      db: "magniteh",
                      alloy: "magnite",
                      cost: 1,
                  },
                  magnitechestplate: {
                      name: "magnite",
                      db: "magnitec",
                      alloy: "magnite",
                      cost: 1,
                  },
                  magniteleggings: {
                    name: "magnite",
                      db: "magnitel",
                      alloy: "magnite",
                      cost: 1,
                  },
                  magniteboots: {
                      name: "magnite",
                      db: "magniteb",
                      alloy: "magnite",
                      cost: 1,
                  },
                  steelhelmet: {
                      name: "",
                      db: "steelh",
                      alloy: "steel",
                      cost: 1,
                  },
                  steelchestplate: {
                      name: "",
                      db: "steelc",
                      alloy: "steel",
                      cost: 1,
                  },
                  steelleggings: {
                    name: "",
                      db: "steell",
                      alloy: "steel",
                      cost: 1,
                  },
                  steelboots: {
                    name: "",
                      db: "steelb",
                      alloy: "steel",
                      cost: 1,
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
                  codiumhelmet: {
                      name: "",
                      db: "codiumh",
                      alloy: "codium",
                      cost: 1,
                  },
                  codiumchestplate: {
                      name: "",
                      db: "codiumc",
                      alloy: "codium",
                      cost: 1,
                  },
                  codiumleggings: {
                      name: "",
                      db: "codiuml",
                      alloy: "codium",
                      cost: 1,
                  },
                  codiumboots: {
                      name: "",
                      db: "codiumb",
                      alloy: "codium",
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
                  magnitesword: {
                      db: "magnites",
                      alloy: "magnite",
                      cost: 1,
                  },
                  steelsword: {
                      db: "steels",
                      alloy: "steel",
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
                  codiumsword: {
                      db: "codiums",
                      alloy: "codium",
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
          if(!args[1]) return cmessage.channel.send("Include which category of item you want to craft")
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
          console.log(request)
          const alloy = request.alloy
          const cost = request.cost
          message.channel.send(`Purchase: ${args[2]} ${args[3]}, Alloy: ${alloy}, Cost: ${cost}`)


          userEcon.findOneAndUpdate(
            {
              userID: message.author.id
            },
            {
                $set: {
                    owns: `${userecon.owns} ${request.db}`
                }
            }
          )
          //take alloy and give item
      },
  };
  