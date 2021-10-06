const userEcon = require("../../models/userEcon");

module.exports = {
	name: "smelt",
	gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/smelt.js",
	category: "eco",
	use: "!m smelt",
	cooldown: 1,
	description: "allows the user to smelt alloys from basic ores",
	async execute(client, message, args, Discord, economy, util) {
		if (message.guild === null) return message.reply("You can't use this command in a DM!");

		const userecon = await client.functions.get("getTargetEcon").execute(message);
		const userutil = await client.functions.get("getUtil").execute(message);

		const alloys = [
			{
				name: "magnite",
				mat1: "iron",
				mat1am: 1000,
				mat2: "gold",
				mat2am: 200,
			},
			{
				name: "steel",
				mat1: "iron",
				mat1am: 1000,
				mat2: "tungsten",
				mat2am: 350,
			},
			{
				name: "elgiloy",
				mat1: "iron",
				mat1am: 800,
				mat2: "cobalt",
				mat2am: 400,
			},
			{
				name: "shakudo",
				mat1: "gold",
				mat1am: 800,
				mat2: "copper",
				mat2am: 800,
			},
			{
				name: "stellite",
				mat1: "cobalt",
				mat1am: 2400,
				mat2: "tungsten",
				mat2am: 800,
			},
			{
				name: "codium",
				mat1: "cobalt",
				mat1am: 2250,
				mat2: "copper",
				mat2am: 1500,
			},
			{
				name: "dymalloy",
				mat1: "cobalt",
				mat1am: 1500,
				mat2: "diamond",
				mat2am: 1000,
			},
			{
				name: "vitallium",
				mat1: "diamond",
				mat1am: 5000,
				mat2: "cobalt",
				mat2am: 3000,
			},
		];

		var oreInv;

		if (userecon.oreInv === "") {
			oreInv = `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`;
		} else {
			oreInv = userecon.oreInv.split(" ");
		}
		if (userecon.alloyInv === "") {
			alloyInv = `magnite@0 steel@0 elgiloy@0 shakudo@0 stellite@0 codium@0 dymalloy@0 vitallium@0`;
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

		const magnite = alloyInv[0].split("@");
		const steel = alloyInv[1].split("@");
		const elgiloy = alloyInv[2].split("@");
		const shakudo = alloyInv[3].split("@");
		const stellite = alloyInv[4].split("@");
		const codium = alloyInv[5].split("@");
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
		console.log(amount)
		var newmagn = 0
		var newstel = 0
		var newelgi = 0
		var newshak = 0
		var newstet = 0
		var newcodi = 0
		var newdyma = 0
		var newvita = 0
		//set price and amount after give
		switch (request) {
			case "magnite":
				ironsub = 1000 * amount;
				goldsub = 200 * amount;
				newmagn = parseInt(magnite[1]) + amount
				break;
			case "steel":
				ironsub = 1000 * amount;
				tungsub = 350 * amount;
				newstel = parseInt(steel[1]) + amount
				break;
			case "elgiloy":
				ironsub = 800 * amount;
				colbsub = 400 * amount;
				newelgi = parseInt(elgiloy[1]) + amount
				break;
			case "shakudo":
				goldsub = 800 * amount;
				coppsub = 800 * amount;
				newshak = parseInt(shakudo[1]) + amount
				break;
			case "stellite":
				colbsub = 2400 * amount;
				tungsub = 800 * amount;
				newstet = parseInt(stellite[1]) + amount
				break;
			case "codium":
				colbsub = 2250 * amount;
				coppsub = 1500 * amount;
				newcodi = parseInt(codium[1]) + amount
				break;
			case "dymalloy":
				colbsub = 1500 * amount;
				diamsub = 1000 * amount;
				newdyma = parseInt(dymalloy[1]) + amount
				break;
			case "vitallium":
				diamsub = 5000 * amount;
				colbsub = 3000 * amount;
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
		const newalloyInv = `magnite@${newmagn} steel@${newstel} elgiloy@${newelgi} shakudo@${newshak} stellite@${newstet} codium@${newcodi} dymalloy@${newdyma} vitallium@${newvita}`
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
	},
};
