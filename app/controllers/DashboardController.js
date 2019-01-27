const model = require("../models");

exports.dashboard = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    model.User.findOne({
      include: [
        { model: model.Note, attributes: ["title", "body", "updatedAt"] }
      ],
      where: { name: req.session.user.name }
    }).then(user => {
      let attribute = {
        appName: "Data security",
        message: `Welcome to pyrrry! Active User: ${req.session.user.name}`,
        authorized: true,
        csrfToken: req.csrfToken(),
        notes: user.Notes
      };

      res.render("home/dashboard", attribute);
    });
  } else {
    res.redirect("/login");
  }
};

const dashboardWithError = (req, res, error) => {
  if (req.session.user && req.cookies.user_sid) {
    model.User.findOne({
      include: [
        { model: model.Note, attributes: ["title", "body", "updatedAt"] }
      ],
      where: { name: req.session.user.name }
    }).then(user => {
      let attribute = {
        appName: "Data security",
        message: `Welcome to pyrrry! Active User: ${req.session.user.name}`,
        authorized: true,
        csrfToken: req.csrfToken(),
        notes: user.Notes,
        error
      };

      res.render("home/dashboard", attribute);
    });
  } else {
    res.redirect("/login");
  }
};

exports.dashboardUserError = (req, res) => dashboardWithError(req, res, "User does not exist, or you are not allowed to edit this users notes!")
exports.dashboardTitleError = (req, res) => dashboardWithError(req, res, `Note with title "${req.body.title}" already exists`);

exports.createNote = (req, res) => {
  console.log("dupauapduapdaupsfdad")
  model.Note.findOrCreate({where: {title: req.body.title, body: req.body.body, UserId: req.session.user.id}}).then((note) =>{ res.redirect("/dashboard")})

  // model.User.findOne({ where: { name: req.session.user.name } }).then(user => {
  //   if (!user) {
  //     res.redirect("/dashboard/user-error");
  //   }
  //   model.Note.findOne({ where: { title: req.body.title } }).then(note => {
  //     if (note) {
  //       res.redirect("/dashboard/title-error");
  //     }

  //     model.Note.create({
  //       title: req.body.title,
  //       body: req.body.body,
  //       UserId: user.id
  //     }).then(() => {
  //       console.log("duuuuuuuuuuuuuuuuuuuuuuuuuuuuuupaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  //       res.redirect("/dashboard");
  //     });
  //   });
  // });
};

exports.deleteNote = (req, res) => {
  model.Note.findOne({where: {title: req.body.title, UserId: req.session.user.id}}).then(note => note.destroy()).then(() => res.redirect("/dashboard")).catch(() => res.redirect("/dashboard/user-error"));
};
