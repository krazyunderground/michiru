const userEcon = require('../models/userEcon')

//dude how do i make an empty string. oh

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
