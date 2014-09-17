var User = require('../auth.model.js');

exports.callback = function(user, req, res, next) {
  User.get_user(user.email, function(err, _user){
    if (err) {
      next(err);
      return;
    }
    if (!_user) {
      User.save_user(user, function(err, _u) {
        req.session.user = {
          email: _u.email,
          domain: _u.domain,
          release: _u.release,
          identity: _u.identity,
          nick_name: user.nick_name
        };
        next(null);
      });
    }
    else {
      req.session.user = {
        email: _user.email,
        domain: _user.domain,
        release: _user.release,
        identity: _user.identity,
        nick_name: user.nick_name
      };
      next(null);
    }
  });
};