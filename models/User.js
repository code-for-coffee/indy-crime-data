var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport = require('passport-local-mongoose');

var User = new Schema ({
  username: String,
  password: String
});

User.plugin(passport);

module.exports = mongoose.model('User', User);
