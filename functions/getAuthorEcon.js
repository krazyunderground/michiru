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
                    coins: 0,
                    pick: 1,
                    oreInv: `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`,
                    alloyInv: `steel@0 magnite@0 elgiloy@0 shakudo@0 stellite@0 cobium@0 dymalloy@0 vitallium@0`,
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
