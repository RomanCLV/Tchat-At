const db = require("../db/mongo");
const passwordHasher = require("password-hash");

async function login (req, res) {
    const user = req.body;
    console.log('logggg:', req.body);
    const existingUser = await db.getUserByPseudo(user.pseudo);
    if (existingUser) {
        console.log(user);
        console.log(existingUser);
        console.log(passwordHasher.generate(user.password));
        console.log(passwordHasher.generate(user.password));
        if (existingUser.password === passwordHasher.generate(user.password)) {
            console.log("success!");
            res.render('success', { msg: "success!"});
        }
        else {
            console.log("wrong password!");
            res.render('wrong password', { msg: "wrong password!"});
        }
    } 
    else {
        console.log("user not found!");
        res.render('user not found', { msg: "user not found!"});
    }
}
exports.login = login;