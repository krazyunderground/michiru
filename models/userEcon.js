const mongoose = require("mongoose");

const userEcon = new mongoose.Schema({
userID: { type: String, require: true, unique: true },
coins: { type: Number, default: 0 },
pick: { type: Number, default: 1 },
oreInv: {type: String},
alloyInv: {type: String},
owns: {type: String},
});

const model = mongoose.model("userEcon", userEcon);

module.exports = model;