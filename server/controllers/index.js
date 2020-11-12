const path = require("path");

function getIndex(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
}

exports.getIndex = getIndex;