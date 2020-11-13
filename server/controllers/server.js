const db = require("../db/mongo");

async function find(req, res) {
    console.log("find serv");
    const allServers = await db.find("servers");
    console.log(allServers);
    if (allServers) {
        res.status(200).json({msg: "success", servers: allServers});
    }
    else {
        res.status(200).json({msg: "error"});
    }
}

async function findOne(req, res) {
    const server = await db.getServerByName(req.params.server);
    if (server) {
        console.log("the serv:", server);
        res.status(200).json({ msg: "success", server: server});
    }
    else {
        res.status(200).json({ msg: "error"});
    }
}

async function findRoomById(req, res) {
    const room = await db.getRoomById(req.params.room);
    if (room) {
        console.log("the room:", room);
        res.status(200).json({ msg: "success", room: room});
    }
    else {
        res.status(200).json({ msg: "error"});
    }
}


exports.find = find;
exports.findOne = findOne;
exports.findRoomById = findRoomById;
