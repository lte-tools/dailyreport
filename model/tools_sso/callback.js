exports.callback = function(user, req, res) {
  req.session.user = user;
}