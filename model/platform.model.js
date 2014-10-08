'use strict';
var episode_api = require('./api.model');

/*jslint unparam: true*/
exports.get_all_name = function (req, res) {
  episode_api.connect('/platform/get_all_name', {}, function (error, body) {
    if (error) {
      res.send(JSON.stringify({
        result: 'error',
        data: error
      }));
    } else {
      res.send(JSON.stringify({
        result: 'ok',
        data: JSON.parse(body).data
      }));
    }
  });
};
/*jslint unparam: false*/

exports.get_all_name_by_email = function (req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  episode_api.connect('/platform/get_all_name_by_email', {
    email: req.session.user.email || ''
  }, function (error, body) {
    if (error) {
      res.send(JSON.stringify({
        result: 'error',
        data: error
      }));
    } else {
      res.send(JSON.stringify({
        result: 'ok',
        data: JSON.parse(body).data
      }));
    }
  });
};

exports.get_manage_platform = function (release, domain, next) {
  episode_api.connect('/platform/get_manage_platform', {
    release: release,
    domain: domain
  }, function (err, body) {
    if (err) {
      next(err);
      return;
    }
    next(null, JSON.parse(body).data);
  });
};

exports.get_all_config = function (req, res) {
  episode_api.connect('/platform/get_all_config', {}, function (error, body) {
    if (error) {
      res.send(JSON.stringify({
        result: 'error',
        data: error,
        rel: req.session.auth
      }));
    } else {
      res.send(JSON.stringify({
        result: 'ok',
        data: JSON.parse(body).data,
        rel: req.session.auth
      }));
    }

  });
};
