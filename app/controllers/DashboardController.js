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

exports.dashboardUserError = (req, res) =>
  dashboardWithError(
    req,
    res,
    "User does not exist, or you are not allowed to edit this users notes!"
  );
exports.dashboardTitleError = (req, res) =>
  dashboardWithError(
    req,
    res,
    `Note with title "${req.body.title}" already exists`
  );

exports.createNote = (req, res) => {
  model.Note.findOrCreate({
    where: {
      title: req.body.title,
      body: req.body.body,
      UserId: req.session.user.id
    }
  }).then(note => {
    res.redirect("/dashboard");
  });
};

exports.deleteNote = (req, res) => {
  model.Note.findOne({
    where: { title: req.body.title, UserId: req.session.user.id }
  })
    .then(note => note.destroy())
    .then(() => res.redirect("/dashboard"))
    .catch(() => res.redirect("/dashboard/user-error"));
};

const resetPassword = (req, res, attribute) => {};

exports.postResetPassword = (req, res) => {
  if (req.body.password !== req.body.password1) {
    res.redirect("/dashboard/password/error");
  }
  model.User.findOne({ where: { id: req.session.user.id } })
    .then(user => user.update({ password: req.body.password }))
    .then(() => res.redirect("/dashboard"));
};

exports.resetPasswordForm = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    const attribute = {
      csrfToken: req.csrfToken(),
      is_invalid: "",
      message: `Welcome to pyrrry! Active User: ${req.session.user.name}`,
      authorized: true
    };

    res.render("home/reset-password", attribute);
  } else {
    res.redirect("/login");
  }
};

exports.resetPasswordFormError = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    const attribute = {
      csrfToken: req.csrfToken(),
      is_invalid: "is-invalid",
      message: `Welcome to pyrrry! Active User: ${req.session.user.name}`,
      authorized: true
    };

    res.render("home/reset-password", attribute);
  } else {
    res.redirect("/login");
  }
};
