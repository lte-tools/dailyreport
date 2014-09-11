var connection = require('../model/db.model').connection
  , sendmail = require('../model/sendmail/mail.model').sendmail
  , mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  identity: String,
  release: String,
  domain: [String]
})

var Auth = connection.model('auths', schema);

exports.get_user_name=function(req, res){
	if (!req.session.user) {
    	res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    	return;
    }
 
	var username= new RegExp(req.session.user.nick_name, 'i');

	Auth
	  .findOne({'name':username})
	  .exec(function(err, doc){
	  	if (err) {
	  		res.send(JSON.stringify({result: 'error', data: 'service database error'}));
	  		return;
	  	}
	  	res.send(JSON.stringify({result: 'ok',data: doc}));

	 
	  	return ;
	  })


	  return ;
};



