const userUtil = require('../models/userUtil')

module.exports = {
    name: "getUtil",
    async execute(message) {
    const author = message.author.id;
    try {
      const authorUtil = await userUtil.findOne({
        userID: author,
      });
      if (!authorUtil) {
        let aup = await userUtil.create({
          userID: author,
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