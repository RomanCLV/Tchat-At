const path = require("path");
const db = require("../db/mongo");
const passwordHasher = require("password-hash");

function signin(req, res) {
    console.log("siiiiignnnnn");
    res.sendFile(path.join(__dirname, "../../client/signin.html"));
}

async function addUser (req, res) {
    const user = req.body;
    console.log('addddddd:', req.body);
    const existingUser = await db.getUserByPseudo(user.pseudo);
    if (existingUser) {
        console.log("user already exisiting!");
        res.render('error', { msg: "user already exisiting!"});
    } 
    else {
        user.password = passwordHasher.generate(password);
        const result = await db.create("users", user);
        if (result) {
            console.log("user added!")
            res.render('success', { msg: "user added!"});
        }
        else {
            console.log("error!")
            res.render('error', { msg: "error!"});
        }
    }
}

exports.signin = signin;
exports.addUser = addUser;
