const db = require("../db/mongo");
const passwordHasher = require("password-hash");

async function login (req, res) {
    const user = req.body;
    const existingUser = await db.getUserByPseudo(user.pseudo);
    if (existingUser) {
        if (passwordHasher.verify(user.password, existingUser.password)) {
            res.status(200).json({msg: "success"});
        }
        else {
            res.status(200).json({msg: "wrong password !"});
        }
    } 
    else {
        res.status(200).json({msg: "user not found!"});
    }
}
exports.login = login;