define(['util/conn'], function (Conn) {
  'use strict';
  var Platform = function () {
    return;
  };

  Platform.get_all_name = function (dbobject, anddothis, object) {
    Conn.send_to_server('/platform/get_all_name/' + dbobject, {
    }, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data);
      } else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Platform.get_all_name_by_email = function (dbobject, anddothis, object) {
    Conn.send_to_server('/platform/get_all_name_by_email/' + dbobject, {
    }, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data);
      } else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Platform.get_all_config = function (dbobject, anddothis, object) {
    Conn.send_to_server('/platform/get_all_config/' + dbobject, {
    }, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data, r.rel);
      } else {
        anddothis.call(object, null, r.data, r.rel);
      }
    }, this);
  };

  Platform.get_manage_platform = function (dbobject, anddothis, object) {
    Conn.send_to_server('/platform/get_manage_platform/' + dbobject, {
    }, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data, r.rel);
      } else {
        anddothis.call(object, null, r.data, r.rel);
      }
    }, this);
  };

  return Platform;
});