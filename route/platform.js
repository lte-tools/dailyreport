var express = require('express')
  , router = express.Router()
  , platform = require('../model/platform.model')

router.post('/get_all_name', function(req, res) {
  platform.get_all_name(req, res);
});


//router.post('/get_all_name',platform.get_all_name);
router.post('/get_all_name_by_email', platform.get_all_name_by_email);
router.post('/get_all_config', function(req, res){
	platform.get_all_config(req, res);
});

module.exports = router;