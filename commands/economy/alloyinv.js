const Discord = require("discord.js");
const userEcon = require("../../models/userEcon");

module.exports = {
  name: "alloyinv",
  category: "eco",
  use: "!m alloyinv",
  description: "shows the alloy inventory of the user",
  aliases: ['ainv', 'alloys'],
  cooldown: 2,
  async execute(client, message, args, Discord, economy){
    if (message.guild === null)
      return message.reply("You can't use this command in a DM!");
    const userecon = await client.functions.get("getTargetEcon").execute(message);
    const userutil = await client.functions.get("getUtil").execute(message);

    var alloyInv;

    if (userecon.alloyInv === "" || !userecon.alloyInv) {
      alloyInv =`magnite@0 steel@0 elgiloy@0 shakudo@0 stellite@0 codium@0 dymalloy@0 vitallium@0`;
    } else {
      alloyInv = userecon.alloyInv.split(" ");
    }

    const LG = alloyInv[0].split("@");
    const TS = alloyInv[1].split("@");
    const Elgiloy = alloyInv[2].split("@");
    const Ronovel = alloyInv[3].split("@");
    const Shakudo = alloyInv[4].split("@");
    const CM = alloyInv[5].split("@");
    const Stellite = alloyInv[6].split("@");
    const MC = alloyInv[7].split("@");
    const Dymalloy = alloyInv[8].split("@");
    const Vitallium = alloyInv[9].split("@");

    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.member.displayName}'s Alloy Inventory!`)
      .setColor(userutil.colour);

    embed.addField("Light Gold", `<:LightGold:873982184682315826> \`${LG[1]}\``);

    embed.addField("Tool Steel", `<:ToolSteel:873983952573071441> \`${TS[1]}\``);

    embed.addField("Elgiloy", `<:Eligloy:874697991414489139> \`${Elgiloy[1]}\``);

    embed.addField("Ronovel", `<:Ronovel:874698717293318154> \`${Ronovel[1]}\``);

    embed.addField("Shakudo", `<:Shakudo:874699440324243486> \`${Shakudo[1]}\``);

    embed.addField("Copper Matrix",`<:CopperMatrix:874700394452906004> \`${CM[1]}\``);

    embed.addField("Stellite", `<:Stellite:874701306634334269> \`${Stellite[1]}\``);

    embed.addField("Master Cobalt", `<:MasterCobalt:874702370460811284> \`${MC[1]}\``);

    embed.addField("Dymalloy", `<:Dymalloy:874702784249884762> \`${Dymalloy[1]}\``);

    embed.addField("Vitallium",`<:Vitallium:874703287402770504> \`${Vitallium[1]}\``);

    message.channel.send({ embeds: [embed] });
  },
};
