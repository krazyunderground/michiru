const guildData = require("../../models/guildData");
module.exports = async (Discord, client, guild) => {
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