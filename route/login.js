var sso = require('../model/tools_sso/login');

exports.welcome = function(req, res) {
  console.log('1 ....');
  if (!req.session.user) {
    console.log('2 ....');
    res.redirect('/login?ref=' + 'http://' + req.headers['host'] + req.url);
  }
  else {
    console.log('3 ....');
    res.send('user: ' + req.session.user.toString());
  }
}

exports.login = function(req, res) {
  if (!req.param('return_key')) {
    console.log('4 ....');
    sso.prepare(req, res);
    return;
  }
  else {
    console.log('5 ....');
    sso.callback(req, res);
    return;
  }
};