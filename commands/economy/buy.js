const Discord = require("discord.js");
const userEcon = require("../../models/userEcon");
module.exports = {
  name: "buy",
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
          cost: 1,
        },
        steelpickaxe: {
          db: "steelp",
          alloy: "steel",
          cost: 1,
        },
        elgiloypickaxe: {
          db: "elgiloyp",
          alloy: "elgiloy",
          cost: 1,
        },
        shakudo: {
          db: "shakudop",
          alloy: "shakudo",
          cost: 1,
        },
        stellitepickaxe: {
          db: "stellitep",
          alloy: "stellite",
          cost: 1,
        },
        codiumpickaxe: {
          db: "codiump",
          alloy: "codium",
          cost: 1,
        },
        dymalloypickaxe: {
          db: "dymalloyp",
          alloy: "dymalloy",
          cost: 1,
        },
        vitalliumpickaxe: {
          db: "vitalliump",
          alloy: "vitallium",
          cost: 1,
        },
      },
    };

    if (!args[3]) args[3] = "";

    if (args[3] === "pick") {
      args[3] = "pickaxe";
    } else {
      args[3] = args[3];
    }

    const query = `${args[2]}${args[3]}`;

    if (!args[1])
      return cmessage.channel.send(
        "Include which category of item you want to craft"
      );

    let category;
    if (args[1] === "picks" || args[1] === "pick" || args[1] === "pickaxe") {
      category = "pickaxes";
    } else {
      category = args[1];
    }

    if (!args[2]) return message.channel.send("Include what you want to buy!");

    if (!categories[category])
      return message.channel.send("That category doesnt exist!");

    if (!categories[category][query])
      return message.channel.send("That item doesnt exist!");

    const request = categories[category][query];

    console.log(request);
  },
};
