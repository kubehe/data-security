let express = require('express');
let router = express.Router();

const middlewares = require("../utils/middlewares");

const homeController = require('../controllers/HomeController');
const authorizationController = require('../controllers/AuthorizationController');

router.get('/', middlewares.sessionChecker,  homeController.index);
router.get('/dashboard',  homeController.dashboard);

module.exports = router;