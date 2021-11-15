const Discord = require("discord.js");
const userEcon = require("../../models/userEcon");
module.exports = {
  name: "buy",
  gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/buy.js",
  category: "eco",
  use: "!m buy",
  description: "allows the user to buy a new pick",
  cooldown: 2,
  async execute(client, message, args, Discord, economy) {
    const categories = {
      pickaxes: {
        magnitepickaxe: {
          db: "magnitep",
          alloy: "magnite",
          rank: 1,
          cost: 10000,
        },
        steelpickaxe: {
          db: "steelp",
          alloy: "steel",
          rank: 2,
          cost: 1,
        },
        elgiloypickaxe: {
          db: "elgiloyp",
          alloy: "elgiloy",
          rank: 3,
          cost: 1,
        },
        shakudo: {
          db: "shakudop",
          alloy: "shakudo",
          rank: 4,
          cost: 1,
        },
        stellitepickaxe: {
          db: "stellitep",
          alloy: "stellite",
          rank: 5,
          cost: 1,
        },
        codiumpickaxe: {
          db: "codiump",
          alloy: "codium",
          rank: 6,
          cost: 1,
        },
        dymalloypickaxe: {
          db: "dymalloyp",
          alloy: "dymalloy",
          rank: 7,
          cost: 1,
        },
        vitalliumpickaxe: {
          db: "vitalliump",
          alloy: "vitallium",
          rank: 8,
          cost: 1,
        },
      },
    };
    //check for one word items
    if (!args[3]) args[3] = "";
    //pickaxe alias for item
    if (args[3] === "pick") {
      args[3] = "pickaxe";
    } else {
      args[3] = args[3];
    }
    //create the query from args
    const query = `${args[2]}${args[3]}`;
    //check for category
    if (!args[1])
      return message.channel.send(
        "Include which category of item you want to craft"
      );
    //pickaxe aliases for category
    let category;
    if (args[1] === "picks" || args[1] === "pick" || args[1] === "pickaxe") {
      category = "pickaxes";
    } else {
      category = args[1];
    }
    //make sure they include an item to purchase
    if (!args[2]) return message.channel.send("Include what you want to buy!");
    //verify category exists
    if (!categories[category])
      return message.channel.send("That category doesnt exist!");
    //verify item exists in category
    if (!categories[category][query])
      return message.channel.send("That item doesnt exist!");
    //set request to item from category
    const request = categories[category][query];
    const userecon = await client.functions.get("getAuthorEcon").execute(message);
    const userutil = await client.functions.get("getUtil").execute(message)
    console.log(request)
    console.log(request.rank)
    if (request.rank < userecon.pick) return message.channel.send("Your pickaxe is already better!")
    const newBal = userecon.coins - request.cost
    await userEcon.findOneAndUpdate(
      {
          userID: message.author.id
      },
      {
          $set:{
              pick: request.rank,
              coins: newBal
          }
      }
  )
  const embed = new Discord.MessageEmbed()
                .setTitle("New item crafted!")
                .setDescription(`**Purchase:** \`${args[2]} ${args[3]}\`\n**Cost:** \`${request.cost}\`\n**New Balance:** \`${newBal}\``)
                .setColor(userutil.colour)

        message.channel.send({embeds: [embed]})
  },
};
