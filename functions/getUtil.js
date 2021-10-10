const userUtil = require('../models/userUtil')

module.exports = {
    name: "getUtil",
    async execute(message) {
    try {
      const authorUtil = await userUtil.findOne({
        userID: message.author.id,
      });
      if (!authorUtil) {
        let aup = await userUtil.create({
          userID: message.author.id,
          colour: "#FF9CA9",
        });
        aup.save();
        return aup;
      } else {
        return authorUtil;
      }
    } catch (err) {
      console.log(err);
    }
  }
};