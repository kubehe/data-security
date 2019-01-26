const csurf = require('csurf');

exports.sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/dashboard');
  } else {
      next();
  }    
};

exports.csrf = csurf({
  cookie: {
    key: '_csrf',
    sameSite: true,
    httpOnly: true,
    cookie: true
  }
})