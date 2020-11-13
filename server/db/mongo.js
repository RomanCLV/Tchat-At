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

async function addUser(user) {
    const dbPath = db.collection("users");
    const r = Math.floor(Math.random() * Math.floor(256));
    const g = Math.floor(Math.random() * Math.floor(256));
    const b = Math.floor(Math.random() * Math.floor(256));
    user.color = '#' + (r * g * b).toString(16);

    const result = await dbPath.insertOne(user)
        .then((e) => true)
        .catch((e) => false)
    return result;
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
    const result = await dbPath.insertOne(object)
        .then((e) => true)
        .catch((e) => false)
    return result;
}

main();

exports.getServerByName = getServerByName;
exports.getUserByPseudo = getUserByPseudo;
exports.create = create;