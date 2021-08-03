const guildData = require('../models/guildData')

module.exports = {
    name: "checkGuild",
    async execute(message) {
    const guildid = message.guild.id;
    try {
      const guild = await guildData.findOne({
        guildID: guildid,
      });
      if (!guild) {
        let gp = await guildData.create({
          guildID: guildid,
          prefix: "!m ",
        });
        gp.save();
        return gp;
      } else {
        return guild;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
