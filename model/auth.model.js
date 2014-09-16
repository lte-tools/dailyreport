var connection = require('./db.model').connection
  , mongoose = require('mongoose');

var Auth = connection.model('auths', new mongoose.Schema({
  name: String,
  identity: {default: 'user', type: String},
  release: {type: String, default: 'null'},
  domain: {type: [String], default: []}
}));


exports.save_user = function(user, next) {
  if (!user.email) {
    next(new Error('no email in user object'));
    return;
  }
  var user = new Auth({
    name: user.email
  });
  user.save(function(err, u, n) {
    next(null, u);
  })
};

exports.get_user = function(email, next){
  var email = new RegExp(email, 'i');
  Auth.findOne({'name': email}, function(err, doc) {
    if (err) {
      next(err);
      return;
    }
    next(null, doc);
  });
};




		


