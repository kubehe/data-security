const middlewares = require('../app/utils/middlewares');
const home = require("../app/routes/home");
const authorization = require("../app/routes/authorization");

exports.set = app => {
  app.use("/", home);
  app.use("/", authorization);

  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });
};
