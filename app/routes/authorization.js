let express = require("express");
let router = express.Router();
const middleware = require("../utils/middlewares");
const authorizationController = require("../controllers/AuthorizationController");
router.get(
  "/login",
  middleware.sessionChecker,
  middleware.csrf,
  authorizationController.login
);
router.post("/login", middleware.csrf, authorizationController.postLogin);
router.post("/signup", middleware.csrf, authorizationController.postSignup);
router.get("/logout", authorizationController.logout);
router.get(
  "/signup/error",
  middleware.sessionChecker,
  middleware.csrf,
  authorizationController.signupError
);
router.get(
  "/signup",
  middleware.sessionChecker,
  middleware.csrf,
  authorizationController.signup
);

module.exports = router;
