const Router = require('express').Router;
const router = Router();
const path = require("path");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/hello', (req, res) => {
    console.log("hello router");
    res.json();
})

module.exports = router;
