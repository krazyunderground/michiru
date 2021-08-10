const mongoose = require("mongoose");

const guildData = new mongoose.Schema({
guildID: { type: String, require: true, unique: true },
prefix: { type: String, default: "!m " },
reportChannel: { type: String },
welcomeChannel: { type: String },
logsChannel: {type: String}
});

const model = mongoose.model("guildData", guildData);

module.exports = model;