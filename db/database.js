var mongoose = require('mongoose');
var connectionString = "mongodb://localhost/indycri";
if (process.env.NODE_ENV === 'production') {
    connectionString = process.env.MONGOLAB_URI;
}
mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log('Securing');
});


mongoose.connection.on('error', function(err) {
  console.log(err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Get to the choppa');
});
