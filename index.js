const mongoose = require("mongoose");
const { SomeModel } = require("./schema/TodoListSchema");
const crypto = require('crypto');
const { Values } = require("./schema/Values");
const { getPrice } = require("./service/getPrice");

const mongoDB = "mongodb://localhost:27017/teste";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
async function create() {
    const UsdLink = await getPrice('LINK');
    const UsdBTC = await getPrice('BTC');
    const UsdDOT = await getPrice('DOT');
    const UsdETH = await getPrice('ETH'); 

    const link = await Values.create({ symbol: 'LINK', value: UsdLink })
    const btc = await Values.create({ symbol: 'BTC', value: UsdBTC })
    const eth = await Values.create({ symbol: 'ETH', value: UsdETH })
    const dot = await Values.create({ symbol: 'DOT', value: UsdDOT })
    await SomeModel.create({ title: 'randomPkey', symbol: 'BTC', amount: 0.01, values_id: btc._id })
    await SomeModel.create({ title: 'randomPkey', symbol: 'ETH', amount: 1, values_id: eth._id })
    await SomeModel.create({ title: 'randomPkey', symbol: 'DOT', amount: 10, values_id: dot._id })
    await SomeModel.create({ title: 'randomPkey', symbol: 'LINK', amount: 20, values_id: link._id })
    await SomeModel.create({ title: 'randomPkey', symbol: 'DOT', amount: 3, values_id: dot._id })
    console.log('created')
}


async function filter() {
    // const i = await SomeModel.find()
    // console.log(i)

    const la = await SomeModel.aggregate([
        {
            $group:
            {
                _id: '$symbol',
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 }
            }
        },
    ]).exec()

    const values = await Values.find();
    console.log(values)
    la.forEach(item => {
        item.total = values.find(val => val.symbol == item._id).value * item.totalAmount
    })

    console.log(la)

}

const lookup = async () => {
    // console.log('holds ', s)
    const lookup = await SomeModel.aggregate([
        {
            $lookup: {
                from: Values.collection.name,
                localField: 'symbol',
                foreignField: 'symbol',
                as: 'Values',
            }
        },
        {
            $set: {
                value: { $arrayElemAt: ["$Values.value", 0] },
            }
        }
    ]).exec()
    console.log('lookup ', lookup)
}
// create()
filter();

// create();