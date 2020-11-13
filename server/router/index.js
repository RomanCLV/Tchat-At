const Router = require('express').Router;
const router = Router();
const controllers = require('../controllers/index');
const middleware = require('../middlewares');

router.use(middleware.isLogged);
router.get('/', controllers.index);

module.exports = router;
