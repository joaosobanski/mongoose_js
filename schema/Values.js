const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ValuesSchema = new Schema({
    symbol: String,
    value: Number
});

const Values = mongoose.model("Values", ValuesSchema);

module.exports = { Values }