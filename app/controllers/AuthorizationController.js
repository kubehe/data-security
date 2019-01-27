const models = require('../models');

exports.login = (req, res) => {
    let attribute = {
        appName: "",
        login: true,
        csrfToken: req.csrfToken()
    };

    res.render("home/login", attribute);
}

exports.postLogin =(req, res) => {
        const name = req.body.name,
            password = req.body.password;

        models.User.findOne({ where: { name } }).then(function (user) {
            if (!user || !user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        }).catch((error) => {
          res.redirect('/login');
        });
    };

exports.signup = (req, res) => {
    let attribute = {
        appName: "Signup in Data Security",
        login: true,
        csrfToken: req.csrfToken(),
        is_invalid: ""
    };

    res.render("home/signup", attribute );
}

exports.signupError = (req, res) => {
    let attribute = {
        appName: "Signup in Data Security",
        login: true,
        csrfToken: req.csrfToken(),
        is_invalid: "is-invalid"
    };

    res.render("home/signup", attribute );
}
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

exports.postSignup = (req, res) => {
    if(!passwordRegExp.test(req.body.password)) {
      res.redirect('/signup');
    }

    models.User.findOne({where: {name: req.body.name}}).then((user) => {
        if(user && user.name) {
            res.redirect("/signup/error");
        } 
    })
  models.User.create({
      name: req.body.name,
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