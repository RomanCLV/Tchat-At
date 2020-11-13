const Router = require('express').Router;
const router = Router();
const routerIndex = require("./index");
const routerLogin = require("./login");
const routerSignin = require("./signin");
const routerServer = require("./server");

router.use(routerIndex);
router.use(routerLogin);
router.use(routerSignin);
router.use(routerServer);

module.exports = router;
