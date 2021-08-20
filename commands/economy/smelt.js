module.exports = {
	name: "smelt",
	category: "eco",
	use: "!m smelt",
	cooldown: 1,
	description: "allows the user to smelt alloys from basic ores",
	async execute(client, message, args, Discord, economy, util) {
		if (message.guild === null) return message.reply("You can't use this command in a DM!");

		const userecon = await client.functions.get("getTargetEcon").execute(message);
		const userutil = await client.functions.get("getUtil").execute(message);

		const alloys = {
			lightgold: {
				name: "lightgold",
				db: "LG",
				mat1: "iron",
				mat1am: 1000,
				mat2: "gold",
				mat2am: 200,
			},
			toolsteel: {
				name: "toolsteel",
				db: "TS",
				mat1: "iron",
				mat1am: 1000,
				mat2: "tungsten",
				mat2am: 350,
			},
			elgiloy: {
				name: "elgiloy",
				db: "Elgiloy",
				mat1: "iron",
				mat1am: 800,
				mat2: "cobalt",
				mat2am: 400,
			},
			ronovel: {
				name: "ronovel",
				db: "Ronovel",
				mat1: "gold",
				mat1am: 2000,
				mat2: "cobalt",
				mat2am: 650,
			},
			shakudo: {
				name: "shakudo",
				db: "Shakudo",
				mat1: "gold",
				mat1am: 800,
				mat2: "copper",
				mat2am: 800,
			},
			coppermatrix: {
				name: "coppermatrix",
				db: "CM",
				mat1: "copper",
				mat1am: 1000,
				mat2: "tungsten",
				mat2am: 500,
			},
			stellite: {
				name: "stellite",
				db: "Stellite",
				mat1: "cobalt",
				mat1am: 2400,
				mat2: "tungsten",
				mat2am: 800,
			},
			mastercobalt: {
				name: "mastercobalt",
				db: "MC",
				mat1: "cobalt",
				mat1am: 2250,
				mat2: "copper",
				mat2am: 1500,
			},
			dymalloy: {
				name: "dymalloy",
				db: "Dymalloy",
				mat1: "cobalt",
				mat1am: 1500,
				mat2: "diamond",
				mat2am: 1000,
			},
			vitallium: {
				name: "vitallium",
				db: "Vitallium",
				mat1: "diamond",
				mat1am: 5000,
				mat2: "cobalt",
				mat2am: 3000,
			},
		};

		var oreInv;

		if (userecon.oreInv === "") {
			oreInv = `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`;
		} else {
			oreInv = userecon.oreInv.split(" ");
		}

		const iron = oreInv[0].split("@");
		const tung = oreInv[1].split("@");
		const gold = oreInv[2].split("@");
		const copp = oreInv[3].split("@");
		const colb = oreInv[4].split("@");
		const diam = oreInv[5].split("@");

		var ironsub = 0;
		var tungsub = 0;
		var goldsub = 0;
		var coppsub = 0;
		var colbsub = 0;
		var diamsub = 0;

		if (!args[1])return message.channel.send("please enter an item to craft. '!m recipes to view the recipe book'");

		const request = args[1].toLowerCase();

		if (!request in alloys) return message.channel.send("this item does not exist! '!m recipes to view the recipe book'");

		const purchase = alloys[request].name;

		switch (purchase) {
			case "lightgold":
				ironsub = 1000;
				goldsub = 200;
				break;
			case "toolsteel":
				ironsub = 1000;
				tungsub = 350;
				break;
			case "elgiloy":
				ironsub = 800;
				colbsub = 400;
				break;
			case "ronovel":
				goldsub = 2000;
				colbsub = 650;
				break;
			case "shakudo":
				goldsub = 800;
				coppsub = 800;
				break;
			case "coppermatrix":
				coppsub = 1000;
				tungsub = 500;
				break;
			case "stellite":
				colbsub = 2400;
				tungsub = 800;
				break;
			case "mastercobalt":
				colbsub = 2250;
				coppsub = 1500;
				break;
			case "dymalloy":
				colbsub = 1500;
				diamsub = 1000;
				break;
			case "vitallium":
				diamsub = 5000;
				colbsub = 3000;
				break;
		}

		if (iron[1] < ironsub) return messsage.reply("You don't have enough iron!");

		if (tung[1] < tungsub) return messsage.reply("You don't have enough tungsten!");

		if (gold[1] < goldsub) return messsage.reply("You don't have enough gold!");

		if (copp[1] < coppsub) return messsage.reply("You don't have enough copper!");

		if (colb[1] < colbsub) return messsage.reply("You don't have enough cobalt!");

		if (diam[1] < diamsub) return messsage.reply("You don't have enough diamonds!");
	},
};
