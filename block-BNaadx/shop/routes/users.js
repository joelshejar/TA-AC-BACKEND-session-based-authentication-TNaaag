 
var express = require("express");
var router = express.Router();
var Users = require("../models/Users");
/* GET users listing. */

router.get("/login", (req, res, next) => {
  res.render("userLogin", { error: req.flash("error") });
});

router.post("/login", function (req, res, next) {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "Email/password required");
    return res.redirect("/users/login");
  }
  Users.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error", "User doesnt exist!! Please signup");
      return res.redirect("/users/login");
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash("error", "password is incorrect");
        return res.redirect("/users/login");
      }
      req.session.userId = user.id;
      req.session.user = user;
      if (user.isAdmin) {
        res.redirect("/admin/" + user._id + "/dasboardAdmin");
      } else {
        res.redirect("/");
      }
    });
  });
});





router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie();
  res.redirect("/");
});


module.exports = router;