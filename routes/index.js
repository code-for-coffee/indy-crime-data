var express = require('express');
var router = express.Router();

var indexInfo = {
  title: 'Indy Crime Data',

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', indexInfo);
});

module.exports = router;
