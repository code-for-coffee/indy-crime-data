var express = require('express');
var router = express.Router();

var indexInfo = {
  title: 'Indy Crime Data',
  desc: 'One stop shop to view commited crime locations in Indianapolis.'

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', indexInfo);
});

router.get('/map', function(req, res, next){
  res.render('map');
})

router.get('/about', function(req, res, next){
  res.render('about', indexInfo)
})

module.exports = router;
