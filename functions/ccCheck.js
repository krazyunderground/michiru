const customCommand = require('../models/customCommands.js')

module.exports = {
    name: "ccCheck",
    async execute(message, input) {
    const guildid = message.guild.id;
    try {
      const cc = await customCommand.findOne({
        guildID: guildid,
        input: input
      });
      if (!cc) {
        return 
      } else {
        return cc;
      }
    } catch (err) {
      console.log(err);
    }
  }
};