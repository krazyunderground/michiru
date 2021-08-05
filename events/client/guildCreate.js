const guildData = require("../../models/guildData");
module.exports = async (Discord, client, guild) => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    const inviteEmbed = new Discord.MessageEmbed()
        .setThumbnail("https://i.imgur.com/BeerOcA.jpg")
        .setImage("https://thumbs.gfycat.com/ThinEnchantingCusimanse-max-1mb.gif")
        .setTitle("Hello!")
        .setDescription(`Hi! I'm Michiru, A discord bot made by Krazyunderground#0001, Thanks for inviting me!\n\nIf you have any questions or want to report a bug, Krazy's DMs are ~~usually~~ open!\n\nTo get started, use \`!m help\``)
        .setFooter("👋")
        .setTimestamp()
    channel.send({embeds: [inviteEmbed]})

  //create guildData in DB
  try {
    const Data = await guildData.findOne({
      guildID: guild.id,
    });

    if (!Data) {
      let profile = await guildData.create({
        guildID: guild.id,
        prefix: "!m",
      });

      profile.save();
      console.log(`${guild.id} New guild profile created!`);
    } else {
      console.log(`${guild.id} already has a guild profile!`);
    }
  } catch (err) {
    console.log(err);
  }
};