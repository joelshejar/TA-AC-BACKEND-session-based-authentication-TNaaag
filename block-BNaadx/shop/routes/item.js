var express = require("express");
const { render } = require("../app");
var router = express.Router();
var Items = require("../models/Items");
var Cart = require("../models/Cart");

router.get("/", (req, res, next) => {
  var session = req.session.userId;
  Items.find({}, (err, content) => {
    if (err) return next(err);
    res.render("listItem", { data: content, session });
  });
});

router.get("/:id/list", (req, res, next) => {
  var id = req.params.id;
  Items.findById({ adminId: id }, (err, content) => {
    if (err) return next(err);
    res.render("listOfAdminProduct", { data: content });
  });
});

router.get("/:id/detail", (req, res, next) => {
  Items.findById(req.params.id)
    .populate("adminId")
    .exec((err, item) => {
      res.render("singleItem", { data: item });
    });
});

router.get("/:id/likes", (req, res, render) => {
  var id = req.session.userId;
  Items.findById(req.params.id, (err, content) => {
    if (err) return next(err);
    if (!req.session.userId) {
      return res.redirect("/users/login");
    }
    if (content.likes.includes(id)) {
      content.likes.pull(id);
    } else {
      content.likes.push(id);
    }
    Items.findByIdAndUpdate(
      req.params.id,
      { likes: content.likes },
      (err, updateContent) => {
        if (err) return next(err);
        res.redirect("/items/" + req.params.id + "/detail");
      }
    );
  });
});

router.get("/:id/edit", (req, res, next) => {
  Items.findById(req.params.id)
    .populate("adminId")
    .exec((err, item) => {
      if (item.adminId.id === req.session.userId) {
        res.render("editItem", { data: item });
      } else {
        res.redirect("/users/login");
      }
    });
});

router.post("/:id/edit", (req, res, next) => {
  Items.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, content) => {
      if (err) return next(err);
      res.redirect("/items/" + req.params.id + "/detail");
    }
  );
});

router.get("/:id/delete", (req, res, next) => {
  Items.findById(req.params.id)
    .populate("adminId")
    .exec((err, item) => {
      if (item.adminId.id === req.session.userId) {
        Items.findByIdAndDelete(req.params.id, (err, content) => {
          res.redirect("/admin/" + item.adminId.id + "/dasboardAdmin");
        });
      } else {
        res.redirect("/users/login");
      }
    });
});

router.get("/:id/cart", (req, res, next) => {
  var sessionId = req.session.userId;
  Cart.findOne({ userId: sessionId }, (err, content) => {
      console.log(content)
    if(err) return next(err);
    if (content === null) {
      req.body.userId = req.session.userId;
      req.body.listItems =  [req.params.id];
      Cart.create(req.body,(err, createContent) => {
        if (err) return next(err);
        console.log(createContent , "undefine")
        res.redirect('/items');
      });
    } else {
      if (content.listItems.includes(req.params.id)) {
        console.log("alredy includes")
        res.redirect('/items');
      } else {
        Cart.findOneAndUpdate({userId: sessionId}, {$push:{listItems: req.params.id}}, {new:true}, (err, content)=> {
          if(err) next(err);
          res.redirect('/items');
        })
      }
    }
  });
});

router.get("/carts", (req, res,next) => {
  Cart.findOne({ userId: req.session.userId })
    .populate("listItems")
    .exec((err, items) => {
        console.log(items);
      if (err) return next(err);
      if(items){
       return res.render("listcarts", { data: items.listItems });
      }else{
        return res.redirect('/items');
      }
    });
});

module.exports = router;