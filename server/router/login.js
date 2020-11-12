const Router = require('express').Router;
const router = Router();
const controllers = require("../controllers/login");

router.get('/login', controllers.login);

module.exports = router;
