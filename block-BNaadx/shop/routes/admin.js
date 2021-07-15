var express = require("express");
var router = express.Router();
var Users = require("../models/Users");
var Card = require("../models/Cart");
const { get } = require("./users");
const { render } = require("../app");
const Items = require("../models/Items");

/* GET home page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", { error: req.flash("error") });
});

// router.get("/login", (req, res, next) => {
//   res.render("adminLogin", { error: req.flash("error") });
// });

router.post("/signup", (req, res, next) => {
  const user = { ...req.body };
  if (req.body.isAdmin === "on") {
    console.log("hello admin");
    user.isAdmin = true;
  } else {
    user.isAdmin = false;
  }
  Users.create(user, (err, content) => {
    if (err) {
      if (err.name === "MongoError") {
        req.flash("error", "This email is already used");
        return res.redirect("/admin");
      }
      if (err.name === "ValidationError") {
        req.flash("error", err.message);
        return res.redirect("/admin");
      }
    }
    res.redirect("/users/login");
  });
});

router.get("/:id/dasboardAdmin", (req, res, next) => {
  var id = req.params.id;
  Users.findById({_id : id, isAdmin: true })
    .populate("itemId")
    .exec((err, content) => {
      if(err) return next(err);
      res.render('dasboardAdmin' , {data:content});
    });
});

router.get("/addItem", (req, res, next) => {
  var id = req.session.userId;
  Users.findById(id, (err, content) => {
    console.log(content);
    if (content.isAdmin) {
      res.render("addItem", { id });
    } else {
      res.redirect('/users/login')
    }
  });
});

router.post("/:id/addItem", (req, res, next) => {
  req.body.adminId = req.params.id;
  Items.create(req.body, (err, content) => {
    if (err) return next(err);
    console.log(content)
    Users.findByIdAndUpdate(
      req.params.id,
      { $push: { itemId: content._id } },
      {new:true},
      (err, updateuser) => {
        if (err) return next(err);
        res.redirect("/admin/" + updateuser._id +  "/dasboardAdmin");
      }
    );
  });
});




module.exports = router;