var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
  userId: String,
  createdAt: {type: Date, default: Date.now}
});

var User = module.exports;
// = mongoose.connection.model('User', userSchema);
// console.log("User " + User);

User.init = function(c) {
  User = module.exports = c.model('User', userSchema);
  return User;
};

User.get = User;
