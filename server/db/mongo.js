require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/TchatAt';
const DB_NAME = process.env.DB_NAME || "TchatAt";

const client = new MongoClient(MONGO_URI);

async function main() {
    await client.connect() // on se connecte au serveur mongo
    const db = client.db(DB_NAME) // use TchatAt

    //const dbUsers = db.collection('users');
    //const users = await dbUsers.find().toArray();
}

async function create(collection, object) {
    //createAndUpdateAt(object, true);
    await client.connect();
    const db = client.db(DB_NAME);
    const dbPath = db.collection(collection);
    await dbPath.insertOne(object)
        .then((e) => console.log("New " + collection + " created : " + e.ops[0]._id))
        .catch((e) => console.log(e))
}

main();
