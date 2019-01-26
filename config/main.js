const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
var csrf = require('csurf');

exports.set = app => {
  app.set("port", process.env.PORT || 3000);
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      key: "user_sid",
      secret: process.env.SECRET || "qwhefqwhfiquwheifqh",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000
      }
    })
  );
  // if cookie is set and user is not set -> logout
  app.use((req, res, next) => {
      console.log("session", req.cookies, req.session )
    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie("user_sid");
    }
    next();
  });
};
