// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://localhost:27017'
//
// const getDB = async function()
// {
//     return (await MongoClient.connect(url)).db('test')
// }

async function save_mongodb(req, res)
{
    // $db = await getDB()
    // const res = await $db.collection('test').insertOne({date: new Date()})
    res.status(200).json({ ok: true })
}

module.exports.get = [save_mongodb]