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
                    pickIMG: "https://cdn.discordapp.com/attachments/853961222520045598/856605265277091840/basic_pick.png",
                    inv: "",
                    oreInv: `iron@0 tungsten@0 gold@0 copper@0 cobalt@0 diamond@0`,
                    alloyInv: `LG@0 TS@0 Elgiloy@0 Ronovel@0 Shakudo@0 CM@0 Stellite@0 MC@0 Dymalloy@0 Vitallium@0`,
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