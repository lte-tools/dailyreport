'use strict';
var sso = require('../model/tools_sso/login');

exports.welcome = function (req, res) {
  if (!req.session.user) {
    res.redirect('/login?ref=' + 'http://' + req.headers.host + req.url);
  } else {
    res.send('user: ' + req.session.user.toString());
  }
};

exports.login = function (req, res) {
  if (!req.param('return_key')) {
    sso.prepare(req, res);
  } else {
    sso.callback(req, res);
  }
};