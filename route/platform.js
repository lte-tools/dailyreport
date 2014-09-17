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

router.post('/get_manage_platform', function(req, res) {
  var release = req.session.user.release;
  var domain = req.session.user.domain;
  platform.get_manage_platform(release, domain, function(err, platforms) {
    if (err) {
      res.send(JSON.stringify({
        result: 'error',
        data: err,
      }));
    }
    else{
      res.send(JSON.stringify({
        result: 'ok',
        data: platforms,
      }));
    }
  });
});

module.exports = router;