const path = require("path");

function index(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
}

exports.index = index;