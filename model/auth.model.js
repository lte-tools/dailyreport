'use strict';
var connection = require('./db.model').connection,
  mongoose = require('mongoose');

var Auth = connection.model('auths', new mongoose.Schema({
  email: String,
  identity: {default: 'user', type: String},
  release: {type: [String], default: []},
  domain: {type: [String], default: []}
}));


exports.save_user = function (user, next) {
  if (!user.email) {
    next(new Error('no email in user object'));
    return;
  }
  var auth = new Auth({
    email: user.email
  });
  auth.save(function (err, u) {
    if (err) {
      next(err, null);
    } else {
      next(null, u);
    }
  });
};

exports.get_user = function (email, next) {
  var email_exp = new RegExp(email, 'i');
  Auth.findOne({'email': email_exp}, function (err, doc) {
    if (err) {
      next(err);
      return;
    }
    next(null, doc);
  });
};


