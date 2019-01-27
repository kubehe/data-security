let express = require("express");
let router = express.Router();

const middlewares = require("../utils/middlewares");
const dashboardController = require("../controllers/DashboardController");

router.post("/note/delete", middlewares.csrf, dashboardController.deleteNote);
router.post("/note", middlewares.csrf, dashboardController.createNote);
router.get("/", middlewares.csrf, dashboardController.dashboard);
router.get("/user-error", middlewares.csrf, dashboardController.dashboardUserError);
router.get("/title-error", middlewares.csrf, dashboardController.dashboardTitleError);

module.exports = router;
