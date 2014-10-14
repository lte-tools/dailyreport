'use strict';
var
  express = require('express'),
  router = express.Router(),
  mail = require('../model/mail.model');


router.post('*', function (req, res, next) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
  } else {
    next();
  }
});

router.post('/send', function (req, res) {
  var
    mail_option = {
      from: req.session.user.email,
      to: req.param('to'),
      cc: req.param('cc'),
      subject: req.param('subject'),
      html: req.param('html')
    },
    mail_info = {
      release: req.param('release') || '',
      domain: req.param('domain') || '',
      for_date: new Date(req.param('for_date') || Date()),
      create_date: new Date(),
      platforms: req.param('platforms') || []
    };
  mail.send(mail_option, mail_info, function (err) {
    if (err) {
      res.send(JSON.stringify({result: 'error', data: String(err)}));
      return;
    }
    res.send(JSON.stringify({result: 'ok'}));
  });
});


router.post('/delete', function (req, res) {
  mail.delete_draft(req.body.draft_id, function (err, mail) {
    if (err) {
      res.send(JSON.stringify({result: 'error', data: err}));
    }
    res.send(JSON.stringify({result: 'ok', data: mail}));
  });
});

router.post('/save_drafts', function (req, res) {
  var
    mail_option = {
      id: req.param('id'),
      from: req.session.user.email,
      to: req.param('to'),
      cc: req.param('cc'),
      subject: req.param('subject'),
      html: req.param('html')
    },
    mail_info = {
      release: req.param('release') || '',
      domain: req.param('domain') || '',
      for_date: new Date(req.param('for_date') || Date()),
      create_date: new Date(),
      platforms: req.param('platforms') || []
    };
  mail.save_drafts(mail_option, mail_info, function (newid, err) {
    if (err) {
      res.send(JSON.stringify({result: 'error', data: String(err)}));
      return;
    }
    res.send(JSON.stringify({result: 'ok', data: String(newid)}));
  });
});

router.post('/get_last', mail.get_last);

router.post('/get_draft/:mailid?', function (req, res) {
  mail.get_draft(req.param('mailid'), req, res);
});

router.post('/get_sent_list', mail.get_sent_list);

router.post('/get_draft_list', mail.get_draft_list);

router.post('/get_received_list', function (req, res) {
  var
    user = req.session.user,
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