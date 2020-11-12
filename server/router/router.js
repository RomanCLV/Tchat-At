const Router = require('express').Router;
const router = Router();
const routerIndex = require("./index");
const routerLogin = require("./login");
const routerSignin = require("./signin");

router.use(routerIndex);
router.use(routerLogin);
router.use(routerSignin);

module.exports = router;
