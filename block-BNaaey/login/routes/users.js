var express = require('express');
var router = express.Router();
var User = require('../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register',(req,res,next)=>{
  res.render('registerForm')
})
router.post('/register', (req,res,next)=>{
  User.create(req.body, (err, user)=>{
    if(err) return next(err)
    res.redirect('/')
  })
})
router.get('/login',(req,res,next)=>{
  res.render('loginForm')
})
router.post('/login', (req,res,next)=>{
  var { email, password} = req.body
  if(!email || !password){
    return res.redirect('/users/login')
  }
  User.findOne({email}, (err,user)=>{
    if(err) return next(err)
    if(!user){
      return res.redirect('login')
    }
    user.verifyPassword(password,(err,result)=>{
      if(err) return next(err)
      if (!result){
        return res.redirect('login')
      }
      req.session.userId = user.id
      res.redirect('dashboard')
    })
  })
})



module.exports = router;
