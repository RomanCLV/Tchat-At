const db = require("../db/mongo");

async function signin (req, res) {
    const user = req.body;
    await db.create("users", user);
    res.send("done");
}

exports.signin = signin;