'use strict';
var episode_api = require('./api.model');

/*jslint unparam: true*/
exports.get_all_name = function (dbobject, req, res) {
  episode_api.connect('/platform/get_all_name', dbobject, {}, function (error, body) {
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

exports.get_all_name_by_email = function (dbobject, req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  episode_api.connect('/platform/get_all_name_by_email', dbobject, {
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

exports.get_manage_platform = function (release, domain, dbobject, next) {
  episode_api.connect('/platform/get_manage_platform', dbobject, {
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

exports.get_all_config = function (dbobject, req, res) {
  episode_api.connect('/platform/get_all_config', dbobject, {}, function (error, body) {
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
