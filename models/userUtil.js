const mongoose = require("mongoose");

const userUtil = new mongoose.Schema({
userID: { type: String, require: true, unique: true },
colour: { type: String, default: "#FF9CA9" },
});

const model = mongoose.model("userUtil", userUtil);

module.exports = model;