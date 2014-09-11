var __c=require('./conn.model.js');
     

  /*
     callback(err, data)
  */
  exports.get_user_name = function(anddothis, object) {
    __c.send_to_server('/auth/get_user_name', {}, function(r) {
      if (r.result != 'ok') {
        anddothis.call(object, r.data, null);
      }
      else {	
        anddothis.call(object, null, r.data);
      }
    }, this);


  }



		


