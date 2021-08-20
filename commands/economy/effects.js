module.exports = {
  name: "effects",
  category: "eco",
  use: "!m effects",
  aliases: ["elist"],
  cooldown: 5,
  description: "allows the user to craft items from materials",
  async execute(client, message, args, Discord, economy, util) {
    const userutil = await client.functions.get("getUtil").execute(message);
    const effects = [
      {
        name: "Malleable",
        effect: "resistance to break abilities",
        alloys: "light gold, shakudo",
      },
      {
        name: "Hardness",
        effect: "harder to break and higher durability",
        alloys: "tool steel, elgiloy, ronovel, dymalloy",
      },
      {
        name: "Lightweight",
        effect: "reduces chance for attack to be dodged",
        alloys: "elgiloy",
      },
      {
        name: "Heavyweight",
        effect: "higher damage but increases chance for attack to be dodged",
        alloys: "copper matrix",
      },
      {
        name: "Heat Resistance",
        effect: "resistant to fire and heat",
        alloys: "tool steel",
      },
      {
        name: "Magnetic",
        effect: "attracts more loot",
        alloys: "light gold",
      },
      {
        name: "Poison",
        effect: "does extra damage",
        alloys: "elgiloy, ronovel, stellite, master cobalt, vitallium",
      },
      {
        name: "Electric",
        effect: "does extra damage",
        alloys: "shakudo, copper matrix, master cobalt, dymalloy",
      },
    ];
    const effectsEmbed = new Discord.MessageEmbed()
      .setTitle("Effects")
      .setDescription("List of alloy effects and what alloys have them!")
      .setColor(userutil.colour);
    for (effect of effects) {
      effectsEmbed.addField(
        `${effect.name}`,
        `${effect.effect} \n\`Alloys: ${effect.alloys}\``
      );
    }
    message.channel.send({ embeds: [effectsEmbed] });
  },
};
