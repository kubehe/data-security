const User = require('../models/user');

exports.login = (req, res) => {
    let attribute = {
        appName: "",
        login: true
    };

    res.render("home/login", { attribute });
}

exports.postLogin =(req, res) => {
        const username = req.body.name,
            password = req.body.password;

        User.findOne({ where: { name: name } }).then(function (user) {
            if (!user || !user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
                res.redirect('/dashboard');
        });
    };

exports.signup = (req, res) => {
    let attribute = {
        appName: "",
        login: true
    };

    res.render("home/signup", { attribute });
}

exports.postSignup = (req, res) => {
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  })
  .then(user => {
      req.session.user = user.dataValues;
      res.redirect('/dashboard');
  })
  .catch(error => {
      res.redirect('/signup');
  });
}

exports.logout = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
  } else {
      res.redirect('/login');
  }
}