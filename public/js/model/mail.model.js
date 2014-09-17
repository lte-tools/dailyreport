define(['util/conn'], function(__c) {

  var Mail = function(_p) {
    
  };

  Mail.send = function(mail_option, anddothis, object) {
    __c.send_to_server('/mail/send/', mail_option, function(r) {
      if (r.result == 'ok') {
        anddothis.call(object, null);
      }
      else {
        anddothis.call(object, r.data);
      }
    }, this);
  };
  
  /*
     callback(err, data)
  */
  Mail.get_sent_list = function(anddothis, object) {
    __c.send_to_server('/mail/get_sent_list', {}, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data, null);
      }
      else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  }

  Mail.get_received_list = function(date, anddothis, object) {
    __c.send_to_server('/mail/get_received_list',{
      date: date
    }, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data, null);
      }
      else {
        anddothis.call(object, null, r.data);
      }      
    }, this)
  }

  Mail.get_by_id = function(id, anddothis, object) {
    __c.send_to_server('/mail/get_by_id', {
      id: id
    }, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data, null);
      }
      else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  };

  Mail.get_last = function(anddothis, object) {
    __c.send_to_server('/mail/get_last', {}, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data, null);
      }
      else {
        anddothis.call(object, null, r.data);
      }
    }, this);
  }

  Mail.save_unsent_mail = function(mail) {
    $.cookie('unsent_mail', mail, {expires: 30, path: '/'});
  }

  Mail.get_unsent_mail = function() {
    return $.cookie('unsent_mail');
  }

  Mail.remove_unsent_mail = function() {
    $.removeCookie('unsent_mail', {path: '/'});
  }

  return Mail;
});