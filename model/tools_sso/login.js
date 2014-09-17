var md5 = require('MD5')
  , config = require('./config.js')
  , callback = require('./callback.js').callback;

exports.callback = function(req, res) {
  if (!req.session.sso_key) {
    res.send(JSON.stringify({
      result: 'error',
      message: 'sso_key not exists in session'
    }));
  }
  var valid_key = md5(req.session.sso_key + config.client['APP_SEC']);
  req.session.sso_key = null;
  if (valid_key != req.param('return_key')) {
    res.send(JSON.stringify({
      result: 'error',
      message: 'valid key error'
    }));
  }
  var user = JSON.parse(req.param('user_str'));
  callback(user, req, res, function(err) {
    if (err) {
      res.send(JSON.stringify({
        result: 'error',
        message: err
      }));
    }
    if (!req.session.ref) {
      res.redirect(config.client['DEFAULT_REF']);
    }
    else {
      res.redirect(req.session.ref);
    }
  });
};

exports.prepare = function(req, res) {
  //console.log(req.headers);
  //console.log(req);
  if (req.param('ref')) {
    req.session.ref = req.param('ref');
  }
  var sign_method_str = '';
  if (req.param('sign_method')) {
    var sign_method = req.param('sign_method');
    sign_method_str = 'sign_method=' + sign_method + '&';
  }
  req.session.sso_key = (Math.floor((Math.random() * 9999) + 1000)).toString();
  var uri = 'http://' + req.headers['host'] + req.path;
  var redirect_path = config.server['url'] + '/sso/do?' + sign_method_str + 'key=' + req.session.sso_key + '&ref=' + uri + '&app_id=' + config.client['APP_ID'];
  res.redirect(redirect_path);

}