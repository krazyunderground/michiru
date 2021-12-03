const userEcon = require("../../models/userEcon");

module.exports = {
	name: "smelt",
	gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/smelt.js",
	category: "eco",
	use: "smelt <alloy> [amount]",
	example: "!m smelt steel 5",
	cooldown: 1,
	description: "allows the user to smelt alloys from basic ores",
	minArgs: 1,
	maxArgs: 2,
	async execute(client, message, args, Discord, economy, util) {
		if (message.guild === null) return message.reply("You can't use this command in a DM!");

		const userecon = await client.functions.get("getTargetEcon").execute(message);
		const userutil = await client.functions.get("getUtil").execute(message);

		const alloys = [
			{
				name: "steel",
				mat1: "iron",
				mat1am: 50,
				mat2: "tungsten",
				mat2am: 35,
			},
			{
				name: "magnite",
				mat1: "iron",
				mat1am: 100,
				mat2: "gold",
				mat2am: 50,
			},
			{
				name: "elgiloy",
				mat1: "iron",
				mat1am: 250,
				mat2: "cobalt",
				mat2am: 10,
			},
			{
				name: "shakudo",
				mat1: "gold",
				mat1am: 250,
				mat2: "copper",
				mat2am: 100,
			},
			{
				name: "stellite",
				mat1: "cobalt",
				mat1am: 100,
				mat2: "tungsten",
				mat2am: 250,
			},
			{
				name: "cobium",
				mat1: "cobalt",
				mat1am: 150,
				mat2: "copper",
				mat2am: 250,
			},
			{
				name: "dymalloy",
				mat1: "cobalt",
				mat1am: 250,
				mat2: "diamond",
				mat2am: 100,
			},
			{
				name: "vitallium",
				mat1: "diamond",
				mat1am: 250,
				mat2: "cobalt",
				mat2am: 500,
			},
		];

		var oreInv;

		if (userecon.oreInv === "") {
			oreInv = `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`;
		} else {
			oreInv = userecon.oreInv.split(" ");
		}
		if (userecon.alloyInv === "") {
			alloyInv = `steel@0 magnite@0 elgiloy@0 shakudo@0 stellite@0 cobium@0 dymalloy@0 vitallium@0`;
		} else {
			alloyInv = userecon.alloyInv.split(" ");
		}
		//get inventories
		const iron = oreInv[0].split("@");
		const tung = oreInv[1].split("@");
		const gold = oreInv[2].split("@");
		const copp = oreInv[3].split("@");
		const colb = oreInv[4].split("@");
		const diam = oreInv[5].split("@");

		const steel = alloyInv[0].split("@");
		const magnite = alloyInv[1].split("@");
		const elgiloy = alloyInv[2].split("@");
		const shakudo = alloyInv[3].split("@");
		const stellite = alloyInv[4].split("@");
		const cobium = alloyInv[5].split("@");
		const dymalloy = alloyInv[6].split("@");
		const vitallium = alloyInv[7].split("@");
		var ironsub = 0;
		var tungsub = 0;
		var goldsub = 0;
		var coppsub = 0;
		var colbsub = 0;
		var diamsub = 0;
		//make sure they request an item
		if (!args[1])return message.channel.send("please enter an item to craft. '!m recipes to view the recipe book'");
		//set the request
		const request = args[1].toLowerCase();
		let amount;
		if(!args[2]) {amount = 1} else {amount = parseInt(args[2]);}
		//verify item exists
		if (!alloys.some(e => e.name === request)) return message.channel.send("this item does not exist! '!m recipes to view the recipe book'");
		var newstel = parseInt(steel[1])
		var newmagn = parseInt(magnite[1])
		var newelgi = parseInt(elgiloy[1])
		var newshak = parseInt(shakudo[1])
		var newstet = parseInt(stellite[1])
		var newcobi = parseInt(cobium[1])
		var newdyma = parseInt(dymalloy[1])
		var newvita = parseInt(vitallium[1])
		//set price and amount after give
		switch (request) {
			case "steel":
				ironsub = 50 * amount;
				tungsub = 35 * amount;
				newstel = parseInt(steel[1]) + amount
				break;
			case "magnite":
				ironsub = 100 * amount;
				goldsub = 50 * amount;
				newmagn = parseInt(magnite[1]) + amount
				break;
			case "elgiloy":
				ironsub = 250 * amount;
				colbsub = 10 * amount;
				newelgi = parseInt(elgiloy[1]) + amount
				break;
			case "shakudo":
				goldsub = 250 * amount;
				coppsub = 100 * amount;
				newshak = parseInt(shakudo[1]) + amount
				break;
			case "stellite":
				colbsub = 100 * amount;
				tungsub = 250 * amount;
				newstet = parseInt(stellite[1]) + amount
				break;
			case "cobium":
				colbsub = 250 * amount;
				coppsub = 100 * amount;
				newcobi = parseInt(cobium[1]) + amount
				break;
			case "dymalloy":
				colbsub = 250 * amount;
				diamsub = 100 * amount;
				newdyma = parseInt(dymalloy[1]) + amount
				break;
			case "vitallium":
				diamsub = 250 * amount;
				colbsub = 500 * amount;
				newvita = parseInt(vitallium[1]) + amount
				break;
		}
		//verify they can afford the item
		if (iron[1] < ironsub) return message.reply("You don't have enough iron!");

		if (tung[1] < tungsub) return message.reply("You don't have enough tungsten!");

		if (gold[1] < goldsub) return message.reply("You don't have enough gold!");

		if (copp[1] < coppsub) return message.reply("You don't have enough copper!");

		if (colb[1] < colbsub) return message.reply("You don't have enough cobalt!");

		if (diam[1] < diamsub) return message.reply("You don't have enough diamonds!");
		//set new ore inventory from switch case prices
		var newiron = parseInt(iron[1]) - ironsub
        var newtung = parseInt(tung[1]) - tungsub
        var newgold = parseInt(gold[1]) - goldsub
        var newcopp = parseInt(copp[1]) - coppsub
        var newcolb = parseInt(colb[1]) - colbsub
        var newdiam = parseInt(diam[1]) - diamsub

		const neworeInv = `iron@${newiron} tungsten@${newtung} gold@${newgold} copper@${newcopp} cobalt@${newcolb} diamond@${newdiam}`
		const newalloyInv = `steel@${newstel} magnite@${newmagn} elgiloy@${newelgi} shakudo@${newshak} stellite@${newstet} cobium@${newcobi} dymalloy@${newdyma} vitallium@${newvita}`
		//update econ
		await userEcon.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                $set:{
                    alloyInv: newalloyInv,
                    oreInv: neworeInv
                }
            }
        )
		message.channel.send(`Successfully smelted ${amount} ${request}.`)
	},
};
