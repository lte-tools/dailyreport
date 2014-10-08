'use strict';
var express = require('express'),
  router = express.Router(),
  platform = require('../model/platform.model');

router.post('/get_all_name/:dbobject?', function (req, res) {
  platform.get_all_name(req.params.dbobject, req, res);
});

router.get('/get_all_name/:dbobject?', function (req, res) {
  platform.get_all_name(req.params.dbobject, req, res);
});

router.post('/get_all_name_by_email/:dbobject?', function (req, res) {
  platform.get_all_name_by_email(req.param('dbobject'), req, res);
});
router.get('/get_all_name_by_email/:dbobject?', function (req, res) {
  platform.get_all_name_by_email(req.param('dbobject'), req, res);
});

router.post('/get_all_config/:dbobject?', function (req, res) {
  platform.get_all_config(req.param('dbobject'), req, res);
});

router.get('/get_all_config/:dbobject?', function (req, res) {
  platform.get_all_config(req.param('dbobject'), req, res);
});

router.post('/get_manage_platform/:dbobject?', function (req, res) {
  platform.get_manage_platform(req.session.user.release, req.session.user.domain, req.param('dbobject'), function (err, platforms) {
    if (err) {
      res.send(JSON.stringify({
        result: 'error',
        data: err
      }));
    } else {
      res.send(JSON.stringify({
        result: 'ok',
        data: platforms
      }));
    }
  });
});

module.exports = router;