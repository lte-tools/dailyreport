define(['util/conn'], function (Conn) {
  'use strict';

  var Mail = function () {
    return;
  };

  Mail.send = function (mail_option, anddothis, object) {
    Conn.send_to_server('/mail/send/', mail_option, function (r) {
      if (r.result === 'ok') {
        anddothis.call(object, null);
      } else {
        anddothis.call(object, r.data);
      }
    }, this);
  };
  /*
     callback(err, data)
  */
  Mail.save_drafts = function (mail_option, anddothis, object) {
    Conn.send_to_server('/mail/save_drafts', mail_option, function (r){
      if (r.result === 'ok') {
        anddothis.call(object, 'ok', r.data);
      } else {
        anddothis.call(object, 'error', r.data);
      }
    },this);
  };
  Mail.get_sent_list = function (anddothis, object) {
    Conn.send_to_server('/mail/get_sent_list', {}, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data, null);
      } else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Mail.get_draft_list = function (anddothis, object) {
    Conn.send_to_server('/mail/get_draft_list', {}, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data, null);
      } else if (r.result === 'newid'){
        anddothis.call(object, null, r.data);
      } else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Mail.get_received_list = function (date, anddothis, object) {
    Conn.send_to_server('/mail/get_received_list', {
      date: date
    }, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data, null);
      } else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Mail.get_by_id = function (id, anddothis, object) {
    Conn.send_to_server('/mail/get_by_id', {
      id: id
    }, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data, null);
      } else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Mail.get_last = function (anddothis, object) {
    Conn.send_to_server('/mail/get_last', {}, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data, null);
      } else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Mail.get_draft = function (mailid, anddothis, object) {
    Conn.send_to_server('/mail/get_draft/' + mailid, {}, function (r) {
      if (r.result !== 'ok') {
        anddothis.call(object, r.data, null);
      } else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Mail.save_unsent_mail = function (mail) {
    $.cookie('unsent_mail', mail, {expires: 30, path: '/'});
  };

  Mail.get_unsent_mail = function () {
    return $.cookie('unsent_mail');
  };

  Mail.remove_unsent_mail = function () {
    $.removeCookie('unsent_mail', {path: '/'});
  };

  return Mail;
});