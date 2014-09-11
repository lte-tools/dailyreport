var express = require('express')
  , router = express.Router()
  , auth = require('./auth.main');


router.post('/get_user_name', auth.get_user_name);


module.exports = router;
