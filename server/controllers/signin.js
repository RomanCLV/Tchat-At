const path = require("path");
const db = require("../db/mongo");

function signin(req, res) {
    console.log("siiiiignnnnn");
    res.sendFile(path.join(__dirname, "../../client/signin.html"));
}

async function addUser (req, res) {
    const user = req.body;
    const result = await db.create("users", user);
    if (result) {
        res.send("done");
    }
    else {
        res.send("not done");
    }
}

exports.signin = signin;
exports.addUser = addUser;
