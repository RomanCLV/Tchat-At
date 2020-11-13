const Router = require('express').Router;
const router = Router();
const controllers = require('../controllers/server');

router.get('/server', controllers.find);

router.post('/server/:server', controllers.findOne);

router.post('/server/:server/room/:room', controllers.findRoomById);

module.exports = router;
