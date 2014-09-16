var Auth = require('../auth.model.js');

exports.callback = function(user, req, res) {
  req.session.user = user;
}