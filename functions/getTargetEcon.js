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
                    coins: 0,
                    pick: 1,
                    oreInv: `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`,
                    alloyInv: `steel@0 magnite@0 elgiloy@0 shakudo@0 stellite@0 cobium@0 dymalloy@0 vitallium@0`,
                    owns: ""
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