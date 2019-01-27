const model = require('../models');

exports.index = (req, res) => {
  res.redirect("/login");
};

exports.dashboard = (req, res) => {
    console.log(req.session, req.cookies)
  if (req.session.user && req.cookies.user_sid) {
    let attribute = {
      appName: "Data security",
      message: `Welcome to pyrrry! user: ${req.session.user.name}`,
      authorized: true,
      notes: [
          {
              title: "dupa",
              body: "alsdkjfa alksdjf alskdjfas dfalksjd fa sdlkjfa sdlkfj alskdjf alksjd flakjs dflakj sdlfkjasldf alsd f", 
              updatedAt: "1231231231231"
          },
          {
              title: "dupa",
              body: "alsdkjfa alksdjf alskdjfas dfalksjd fa sdlkjfa sdlkfj alskdjf alksjd flakjs dflakj sdlfkjasldf alsd f", 
              updatedAt: "1231231231231"
          },
          {
              title: "dupa",
              body: "alsdkjfa alksdjf alskdjfas dfalksjd fa sdlkjfa sdlkfj alskdjf alksjd flakjs dflakj sdlfkjasldf alsd f", 
              updatedAt: "1231231231231"
          },
          {
              title: "dupa",
              body: "alsdkjfa alksdjf alskdjfas dfalksjd fa sdlkjfa sdlkfj alskdjf alksjd flakjs dflakj sdlfkjasldf alsd f", 
              updatedAt: "1231231231231"
          },
          {
              title: "dupa",
              body: "alsdkjfa alksdjf alskdjfas dfalksjd fa sdlkjfa sdlkfj alskdjf alksjd flakjs dflakj sdlfkjasldf alsd f", 
              updatedAt: "1231231231231"
          },
          {
              title: "dupa",
              body: "alsdkjfa alksdjf alskdjfas dfalksjd fa sdlkjfa sdlkfj alskdjf alksjd flakjs dflakj sdlfkjasldf alsd f", 
              updatedAt: "1231231231231"
          },
      ]
    };

    res.render("home/dashboard", attribute );
  } else {
    res.redirect("/login");
  }
};
