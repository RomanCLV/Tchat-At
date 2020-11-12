const Router = require('express').Router;
const router = Router();
const routerIndex = require("../router/index");
const routerLogin = require("../router/login");
const routerSignin = require("../router/signin");

router.use(routerIndex);
router.use(routerLogin);
router.use(routerSignin);

module.exports = router;
