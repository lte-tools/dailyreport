define(['util/conn'], function(__c) {

  var Plan = function(_p) {
    
  };

  Plan.get = function(_lab_id, anddothis, object) {
    __c.send_to_server('/plan/get/' + _lab_id, {
    }, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, null);
      }
      else {
        anddothis.call(object, JSON.parse(r.info));
      }
    }, this);
  };

  Plan.save = function(_info, anddothis, object) {
    __c.send_to_server('/plan/save', {
      info: JSON.stringify(_info)
    }, anddothis, object);
  };
  Plan.remove = function(_plan_id, anddothis, object) {
    __c.send_to_server('/plan/remove/' + _plan_id, {
    }, anddothis, object);
  };
  return Plan;
});