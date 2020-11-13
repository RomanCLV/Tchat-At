const Router = require('express').Router;
const router = Router();

const controllers = require("../controllers/signin");

router.get('/signin', controllers.signin);

router.post('/signin', controllers.addUser);

module.exports = router;
