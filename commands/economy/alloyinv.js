const Discord = require("discord.js");
const userEcon = require("../../models/userEcon");

module.exports = {
  name: "alloyinv",
  gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/alloyinv.js",
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
    const mag = alloyInv[0].split("@");
    const stee = alloyInv[1].split("@");
    const elg = alloyInv[2].split("@");
    const sha = alloyInv[3].split("@");
    const stel = alloyInv[4].split("@");
    const cod = alloyInv[5].split("@");
    const dym = alloyInv[6].split("@");
    const vit = alloyInv[7].split("@");

    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.member.displayName}'s Alloy Inventory!`)
      .setColor(userutil.colour);

    embed.addField("Light Gold", `<:LightGold:873982184682315826> \`${mag[1]}\``);

    embed.addField("Tool Steel", `<:ToolSteel:873983952573071441> \`${stee[1]}\``);

    embed.addField("Elgiloy", `<:Eligloy:874697991414489139> \`${elg[1]}\``);

    embed.addField("Shakudo", `<:Shakudo:874699440324243486> \`${sha[1]}\``);

    embed.addField("Stellite", `<:Stellite:874701306634334269> \`${stel[1]}\``);

    embed.addField("Codium", `<:MasterCobalt:874702370460811284> \`${cod[1]}\``);

    embed.addField("Dymalloy", `<:Dymalloy:874702784249884762> \`${dym[1]}\``);

    embed.addField("Vitallium",`<:Vitallium:874703287402770504> \`${vit[1]}\``);

    message.channel.send({ embeds: [embed] });
  },
};
