'use strict';
var express = require('express'),
  router = express.Router(),
  mail = require('../model/mail.model');


router.post('/send', mail.send);
router.post('/get_last', mail.get_last);
router.post('/get_sent_list', mail.get_sent_list);
router.post('/get_received_list', function (req, res) {
  var user = req.session.user,
    date = req.param('date');
  mail.get_received_list(user, date, function (err, mails) {
    if (err) {
      res.send(JSON.stringify({result: 'error', data: err}));
    }
    res.send(JSON.stringify({result: 'ok', data: mails}));
  });
});
router.post('/get_by_id', function (req, res) {
  var id = req.param('id');
  mail.get_by_id(id, function (err, mail) {
    if (err) {
      res.send(JSON.stringify({result: 'error', data: err}));
    }
    res.send(JSON.stringify({result: 'ok', data: mail}));
  });
});

module.exports = router;
