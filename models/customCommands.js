const mongoose = require("mongoose");

const customCommand = new mongoose.Schema({
guildID: { type: String, require: true },
input: { type: String, require: true, unique: true },
output: { type: String, require: true }
});

const model = mongoose.model("customCommand", customCommand);

module.exports = model;