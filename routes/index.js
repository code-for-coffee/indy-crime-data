var express = require('express');
var router = express.Router();

var indexInfo = {
  title: 'Local Record',
  locations: ['Future Location', 'Indianapolis, Indiana', 'Chicago, Illinois'],
  desc: 'Where you can understand the crime rate of your city and help create a safer environment.'

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
