const db = require("../db/mongo");
const passwordHasher = require("password-hash");

async function signin (req, res) {
    const user = req.body;
    const existingUser = await db.getUserByPseudo(user.pseudo);
    if (existingUser) {
        res.status(200).json({msg: "user alredy existing"});
    } 
    else {
        user.password = passwordHasher.generate(user.password);
        const result = await db.create("users", user);
        if (result) {
            res.status(200).json({msg: "success"});
        }
        else {
            res.status(200).json({msg: "error"});
        }
    }
}

exports.signin = signin;
