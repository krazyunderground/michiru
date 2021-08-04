const mongoose = require("mongoose");

const userEcon = new mongoose.Schema({
userID: { type: String, require: true, unique: true },
quartz: { type: Number, default: 200 },
pick: { type: Number, default: 1 },
pickIMG: { type: String, default: "https://cdn.discordapp.com/attachments/853961222520045598/856605265277091840/basic_pick.png" }
});

const model = mongoose.model("userEcon", userEcon);

module.exports = model;