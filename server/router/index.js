const Router = require('express').Router;
const router = Router();
const controllers = require('../controllers/index');

router.get('/', controllers.index);

module.exports = router;
