const userEcon = require('../models/userEcon')

module.exports = {
    name: "getTargetEcon",
    async execute(message) {
        const target = message.mentions.users.first() || message.author;
        try {
            const targetEcon = await userEcon.findOne({
                userID: target.id,
            });

            if (!targetEcon) {
                let tp = await userEcon.create({
                    userID: target.id,
                    quartz: 200,
                    pick: 1,
                    pickIMG:
                        "https://cdn.discordapp.com/attachments/853961222520045598/856605265277091840/basic_pick.png",
                });

                tp.save();
                return tp;
            } else {
                return targetEcon;
            }
        } catch (err) {
            console.log(err);
        }
    }
};