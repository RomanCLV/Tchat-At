const Router = require('express').Router;
const router = Router();
const controllers = require("../controllers/signin");

router.post('/signin', controllers.signin);

module.exports = router;
