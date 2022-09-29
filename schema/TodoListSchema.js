const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    title: String,
    date: { type: Date, default: Date.now },
});

const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

module.exports = { SomeModel }