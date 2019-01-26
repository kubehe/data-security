const express = require("express");
const models = require("./app/models");
const configMain = require("./config/main");
const configPath = require("./config/path");
const configRoutes = require("./config/routes");
const configView = require("./config/view");
const debug = require('debug')('express-sequelize');
const app = express();

console.log(process.env)
models.sequelize.sync().then(() => {
  configView.set(app);
  configPath.set(app);
  configMain.set(app);
  configRoutes.set(app);

  const port = app.get("port");
  app.listen(port, () => {
    debug("Application listening on port " + port + "!");
  });
});
