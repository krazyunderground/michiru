const userUtil = require('../models/userUtil')

module.exports = {
    name: "getUserUtil",
    async execute(member) {
    try {
      const UserUtil = await userUtil.findOne({
        userID: member.id,
      });
      if (!UserUtil) {
        let aup = await userUtil.create({
          userID: member.id,
          colour: "#FF9CA9",
        });
        aup.save();
        return aup;
      } else {
        return UserUtil;
      }
    } catch (err) {
      console.log(err);
    }
  }
};