const userEcon = require('../models/userEcon')

module.exports = {
    name: "getAuthorEcon",
    async execute(message) {
        const author = message.author.id;
        try {
            const AuthorEcon = await userEcon.findOne({
                userID: author,
            });

            if (!AuthorEcon) {
                let ap = await userEcon.create({
                    userID: author,
                    quartz: 200,
                    pick: 1,
                    pickIMG:
                        "https://cdn.discordapp.com/attachments/853961222520045598/856605265277091840/basic_pick.png",
                });

                ap.save();
                return ap;
            } else {
                return AuthorEcon;
            }
        } catch (err) {
            console.log(err);
        }
    }
};
