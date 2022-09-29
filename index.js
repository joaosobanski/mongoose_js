const mongoose = require("mongoose");
const { SomeModel } = require("./schema/TodoListSchema");
const crypto = require('crypto');

async function main() {
    const mongoDB = "mongodb://localhost:27017/teste";
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));


    while (true) {
        let buffer = await crypto.randomBytes(32);
        let randomPkey = buffer.toString('hex');
        await SomeModel.create({ title: randomPkey })
    }
}

main();