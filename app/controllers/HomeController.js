exports.index = (req, res) => {
  res.redirect("/login");
};

exports.dashboard = (req, res) => {
    console.log(req.session, req.cookies)
  if (req.session.user && req.cookies.user_sid) {
    let attribute = {
      appName: "Data security",
      message: "Welcome to odbyt laasdlkasfasfafjslkfjalfjknd!",
      authorized: true
    };

    res.render("home/dashboard", attribute );
  } else {
    res.redirect("/login");
  }
};
