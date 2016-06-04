// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var router = express.Router();

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', function(req, res){
  res.render('user', {
    user:req.user
  })
});

router.get('/login', function(req, res){
  res.render('login', {
    user:req.user
  })
});
//on failrue redirect home
router.post('/login', passport.authenticate('local', {failureRedirect: '/'}),
  function(req, res){
    res.redirect('/');
  }
);

router.get('/register', function(req, res){
  res.render('register', {
    user:req.user
  })
});

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

router.post('/register', function(req, res){
  User.register(new User({
    username: req.body.username
  }),
  req.body.password,
  function(err, account){
    if(err){
      return res.render('register', { user: user});
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/');
    });
  });
});
module.exports = router;
