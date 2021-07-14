var express = require("express");
const { render } = require("../app");
var router = express.Router();
var Article = require("../models/Article");
var Comment = require("../models/Comment");
var Users = require("../models/Users");

router.get("/", (req, res, next) => {
  var session = req.session.userId;
  Article.find({}, (err, content) => {
    if (err) next(err);
    console.log(content);
    Users.findById(session, (err, user) => {
      if (err) return next(err);
      return res.render("articles", {
        articles: content,
        session: session,
        user: user,
      });
    });
  });
});

router.get("/new", (req, res, next) => {
  if (req.session.userId) {
    return res.render("newArticle");
  } else {
    return res.redirect("/users/login");
  }
});

router.post("/", (req, res, next) => {
  var session = req.session.userId;
  Article.create(req.body, (err, content) => {
    if (err) return next(err);
    res.redirect("/article");
  });
});

router.get("/:id/detail", (req, res, next) => {
  var session = req.session.userId;
  if (session) {
    Article.findById(req.params.id)
      .populate("comments")
      .exec((err, content) => {
        if (err) return next(err);
        res.render("detail", { data: content, session });
      });
  } else {
    return res.redirect("/users/login");
  }
});

router.get("/:slug/like", (req, res, next) => {
  let slug = req.params.slug;

  Article.findOneAndUpdate(
    { slug },
    { $inc: { likes: 1 } },
    (err, updatedArticle) => {
      if (err) return next(err);
      res.render("detail", {
        data: updatedArticle,
        session: req.session.userId,
      });
    }
  );
});

router.get("/:slug/edit", (req, res, next) => {
  Article.findOneAndUpdate(
    { slug: req.params.slug },
    { new: true },
    (err, content) => {
      if (err) return next(err);
      res.render("editArticle", { data: content });
    }
  );
});

router.post("/:slug/edit", (req, res, next) => {
  console.log(req.body, "hi");
  Article.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true },
    (err, content) => {
      if (err) return next(err);
      console.log(content);
      res.redirect("/article/" + content.slug);
    }
  );
});

router.get("/:id/delete" , (req, res, next)=> {
    var id = req.params.id;
    Article.findByIdAndDelete( id, (err, content)=> {
        if(err) return next(err);
        Comment.deleteMany({articleId: id},(err , content)=>{
            if(err) return next(err);
            console.log(content)
            res.redirect('/article');
        })
    })
})

router.post("/:id/comment", (req, res, next) => {
    req.body.aticleId = req.params.id;
  Comment.create(req.body, (err, content) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: content._id } },
      (err, article) => {
        if (err) return next(err);
        res.redirect("/article/" + article.slug);
      }
    );
  });
});



router.get("/:slug", (req, res, next) => {
  var slug = req.params.slug;
  var session = req.session.userId;
  Article.findOne({ slug })
    .populate("comments")
    .exec((err, content) => {
      if (err) return next(err);
      res.render("detail", { data: content, session });
    });
});

module.exports = router;