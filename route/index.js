'use strict';
/*jslint unparam: true*/

var express = require('express'),
  router = express.Router(),
  mail = require('../model/mail.model'),
  login = require('./login'),
  mongoose = require('mongoose'),
  connection = require('../model/db.model').connection;



var userAuthen = function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login?ref=' + 'http://' + req.headers.host + req.url);
  } else {
    next();
  }
};

router.get('/login', function (req, res) {
  login.login(req, res);
});
router.get('/doc', function (req, res) {
  res.render('doc');
});

router.get('*', userAuthen);

router.get('/welcome', function (req, res) {
  login.welcome(req, res);
});
router.get(/\/editor([a-zA-Z\/]*)/, function (req, res) {
  res.render('editor');
});

router.get('/', function (req, res) {
  var user = req.session.user;
  console.log(user);
  if (user.identity === 'manager' || user.identity === 'primer') {
    req.session.auth = user.release;
    res.render('manager', {user: user});
  } else {
    res.render('user', {user: user});
  }
});

module.exports = router;
/*jslint unparam: false*/
