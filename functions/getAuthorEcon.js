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
                    coins: 200,
                    pick: 1,
                    pickIMG:"https://cdn.discordapp.com/attachments/853961222520045598/856605265277091840/basic_pick.png",
                    inv: "",
                    oreInv: `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`,
                    alloyInv: `LG@0 TS@0 Elgiloy@0 Ronovel@0 Shakudo@0 CM@0 Stellite@0 MC@0 Dymalloy@0 Vitallium@0`,
                    owns: ""
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
