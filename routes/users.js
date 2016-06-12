var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var router = express.Router();

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', function(req, res){
  console.log('got user');
  res.render('user', {
    user:req.user
  })
});

router.get('/login', function(req, res){
  console.log('logged in');
  res.render('login', {
    user:req.user
  })
});
//on failrue redirect home
router.post('/login', passport.authenticate('local', {failureRedirect: '/'}),
  function(req, res){
    res.redirect('/user');
  }
);

// router.get('/register', function(req, res){
//   User.register(new User({
//     username: req.body.username,
//     email: req.body.email
//   }),
//   req.body.password,
//   )
//   res.render('/', {
//     user:req.user
//   })
// });

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

router.post('/register', function(req, res){
  User.register(new User({
    username: req.body.username
  }),
  req.body.password,
  function(err, user){
    console.log('in error or create function');
    if(err){
      console.log('we hit error and didn\'t authenticate');
      return res.render('/', err);
    }
    passport.authenticate('local')(req, res, function(){
      console.log('passport authenticated redirecting');
      res.redirect('/');
    });
  });
});
module.exports = router;
