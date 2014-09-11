var jsdom =require('jsdom');
var $ = require('jquery')(jsdom.jsdom().createWindow());

exports.send_to_server = function(url,data,anddothis,object){
  $.ajax({	
    url:url,
    type:'POST',
    dataType:'json',
    data:data
  })
  .done(function(r){
  	anddothis.call(object,r);
  });

};


