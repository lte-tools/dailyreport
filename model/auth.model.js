var connection = require('./db.model').connection
  , mongoose = require('mongoose');

var Auth = connection.model('auths', new mongoose.Schema({
  email: String,
  identity: {default: 'user', type: String},
  release: {type: [String], default: []},
  domain: {type: [String], default: []}
}));


exports.save_user = function(user, next) {
  if (!user.email) {
    next(new Error('no email in user object'));
    return;
  }
  var user = new Auth({
    email: user.email
  });
  user.save(function(err, u, n) {
    next(null, u);
  })
};

exports.get_user = function(email, next){
  var email = new RegExp(email, 'i');
  Auth.findOne({'email': email}, function(err, doc) {
    if (err) {
      next(err);
      return;
    }
    next(null, doc);
  });
};




		


