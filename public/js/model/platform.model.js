define(['util/conn'], function(__c) {

  var Platform = function(_p) {
    
  };

  Platform.get_all_name = function(anddothis, object) {
    __c.send_to_server('/platform/get_all_name/', {
    }, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data);
      }
      else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Platform.get_all_name_by_email = function(anddothis, object) {
    __c.send_to_server('/platform/get_all_name_by_email', {
    }, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data);
      }
      else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Platform.get_all_config = function(anddothis, object) {
    __c.send_to_server('/platform/get_all_config', { 
    }, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data, r.rel);      
      }
      else {
        anddothis.call(object, null, r.data, r.rel);
      }
    }, this);
    
  };

  Platform.get_manage_platform = function(anddothis, object) {
    __c.send_to_server('/platform/get_manage_platform', { 
    }, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data, r.rel);      
      }
      else {
        anddothis.call(object, null, r.data, r.rel);
      }
    }, this);
  };

  return Platform;
});