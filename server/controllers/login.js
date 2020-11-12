const path = require("path");

function login(req, res) {
    console.log("loggggggginn");
    res.sendFile(path.join(__dirname, "../../client/login.html"));
}

exports.login = login;