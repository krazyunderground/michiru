const mongoose = require("mongoose");

const guildData = new mongoose.Schema({
guildID: { type: String, require: true, unique: true },
prefix: { type: String, default: "!m " },
welcomeChannel: { type: String },
captchaRole: {type: String}
});

const model = mongoose.model("guildData", guildData);

module.exports = model;