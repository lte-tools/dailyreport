var Plan = require('../model/plan.model');

exports.get = function(req, res) {
  var lab_id = req.params.lab_id;
  Plan.find({'lab_id': lab_id}, function(err, doc) {
    if (!doc || err) {
      return res.send(JSON.stringify({
        result: 'err'
      }));
    }
    else {
      return res.send(JSON.stringify({
        result: 'ok',
        info: JSON.stringify(doc)
      }));
    }
  });
};

exports.save = function(req, res) {
  var info = JSON.parse(req.param('info'));
  var plan = new Plan(info);
  plan.save(function(err){});
  return res.send(JSON.stringify({
    result: 'ok',
  }));
};

exports.remove = function(req, res) {
  var id = req.params.plan_id;
  Plan.findOne({'_id': id}, function(err, doc) {
    if (doc) {
      doc.remove();
    }
    return res.send(JSON.stringify({
      result: 'ok',
    }));
  })
};