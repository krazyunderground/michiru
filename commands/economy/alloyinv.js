const Discord = require("discord.js");
const userEcon = require("../../models/userEcon");

module.exports = {
  name: "alloyinv",
  gitlink: "https://github.com/krazyunderground/michiru/blob/main/commands/economy/alloyinv.js",
  category: "eco",
  use: "alloyinv",
  description: "shows the alloy inventory of the command user.",
  aliases: ['ainv', 'alloys'],
  cooldown: 5,
  maxArgs: 0,
  async execute(client, message, args, Discord){
    if (message.guild === null)
      return message.reply("You can't use this command in a DM!");
    const userecon = await client.functions.get("getUserEcon").execute(message.member);
    const userutil = await client.functions.get("getUserUtil").execute(message.member);

    var alloyInv;

    if (userecon.alloyInv === "" || !userecon.alloyInv) {
      alloyInv =`magnite@0 steel@0 elgiloy@0 shakudo@0 stellite@0 cobium@0 dymalloy@0 vitallium@0`;
    } else {
      alloyInv = userecon.alloyInv.split(" ");
    }
    const stee = alloyInv[0].split("@");
    const mag = alloyInv[1].split("@");
    const elg = alloyInv[2].split("@");
    const sha = alloyInv[3].split("@");
    const stel = alloyInv[4].split("@");
    const cob = alloyInv[5].split("@");
    const dym = alloyInv[6].split("@");
    const vit = alloyInv[7].split("@");

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
      .setTitle(`${message.member.user.username}'s Alloy Inventory!`)
      .setColor(userutil.colour)
      .setTimestamp()
      .setFooter("💸", client.user.displayAvatarURL())

    embed.addField("Steel", `<:Steel:914215785851920394> \`${stee[1]}\``);

    embed.addField("Magnite", `<:Magnite:914215828415737936> \`${mag[1]}\``);

    embed.addField("Elgiloy", `<:Elgiloy:914215874955714601> \`${elg[1]}\``);

    embed.addField("Shakudo", `<:Shakudo:914215926948331582> \`${sha[1]}\``);

    embed.addField("Stellite", `<:Stellite:914215990332624946> \`${stel[1]}\``);

    embed.addField("Cobium", `<:Cobium:914216058586554469> \`${cob[1]}\``);

    embed.addField("Dymalloy", `<:Dymalloy:914216104694517892> \`${dym[1]}\``);

    embed.addField("Vitallium",`<:Vitallium:914216146905997322> \`${vit[1]}\``);

    message.reply({ embeds: [embed] });
  },
};
