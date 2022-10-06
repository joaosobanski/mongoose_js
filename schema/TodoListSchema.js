const mongoose = require("mongoose");
const { Values } = require("./Values");

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    title: String,
    symbol: String,
    amount: Number,
    values_id: { type: mongoose.Schema.Types.ObjectId, ref: Values.collection.name },
    date: { type: Date, default: Date.now },
});

const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

module.exports = { SomeModel }