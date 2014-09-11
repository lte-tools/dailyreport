var express = require('express')
  , router = express.Router()
  , mail = require('../model/mail.model')


router.post('/send', mail.send);
router.post('/get_last', mail.get_last);
router.post('/get_sent_list', mail.get_sent_list);
router.post('/get_received_list', mail.get_received_list);

module.exports = router;
