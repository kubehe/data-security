
let express = require('express');
let router = express.Router();
const middleware = require('../utils/middlewares');
const authorizationController = require('../controllers/AuthorizationController');
router.get('/login', middleware.sessionChecker, authorizationController.login)
router.post('/login', authorizationController.postLogin);
router.get('/signup', middleware.sessionChecker, authorizationController.signup);
router.post('/signup', authorizationController.postSignup);
router.get('/logout', authorizationController.logout);

module.exports = router;