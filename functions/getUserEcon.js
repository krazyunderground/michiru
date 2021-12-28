const userEcon = require('../models/userEcon')

module.exports = {
    name: "getUserEcon",
    async execute(member) {
        const user = member.id
        try {
            const userEcon = await userEcon.findOne({
                userID: user.id,
            });
    
            if (!userEcon) {
                let tp = await userEcon.create({
                    userID: user.id,
                    coins: 0,
                    pick: 1,
                    oreInv: `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`,
                    alloyInv: `steel@0 magnite@0 elgiloy@0 shakudo@0 stellite@0 cobium@0 dymalloy@0 vitallium@0`,
                    owns: ""
                });

                tp.save();
                return tp;
            } else {
                return userEcon;
            }
        } catch (err) {
            console.log(err);
        }
    }
};