require('dotenv').config();
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/TchatAt';
const DB_NAME = process.env.DB_NAME || "TchatAt";

const client = new MongoClient(MONGO_URI);

const Joe = {
    pseudo: "Joe",
    password: "123456"
}

let db;

async function main() {
    await client.connect();  // on se connecte au serveur mongo
    db = client.db(DB_NAME); // use TchatAt
    //create("users", Joe);
    //getUserByPseudo("Joe");
}

async function getUserByPseudo(pseudo) {
    const dbPath = db.collection("users");
    const user = await dbPath.findOne({ pseudo: pseudo })
        .then((e) => { return e; })
        .catch((e) => console.log(e))
    return user;
}

async function getServerByName(name) {
    const dbPath = db.collection("servers");
    const server = await dbPath.findOne({ name: name })
        .then((e) => { return e; })
        .catch((e) => console.log(e))
    return server;
}

async function create(collection, object) {
    const dbPath = db.collection(collection);
    await dbPath.insertOne(object)
        .then((e) => console.log("New " + collection + " created : " + e.ops[0]._id))
        .catch((e) => console.log(e))
}

main();
