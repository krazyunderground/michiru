const econs = require('../models/userEcon')

module.exports = {
    name: "getUserEcon",
    async execute(member) {
        const user = member.user.id
        try {
            const userEcon = await econs.findOne({
                userID: user,
            });
    
            if (!userEcon) {
                let tp = await econs.create({
                    userID: user,
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