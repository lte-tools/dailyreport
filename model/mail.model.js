var connection = require('./db.model').connection
  , sendmail = require('./sendmail/mail.model').sendmail
  , mongoose = require('mongoose');

var schema = new mongoose.Schema({
  mail_header: {
    from: String,
    to: [String],
    cc: [String],
    subject: String
  },
  mail_body: String,
  mail_info: {
    release: String,
    domain: String,
    domain: String,
    for_date: Date,
    create_date: Date,
    platforms: [String]
  }
})

var Mail = connection.model('mails', schema);

exports.get_sent_list = function(req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  var email = new RegExp(req.session.user.email, 'i');
  Mail
    .find({'mail_header.from': email})
    .sort('mail_info.for_date')
    .exec(function(err, docs) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error'}));
        return;    
      }
      res.send(JSON.stringify({result: 'ok', data: docs}));
      return;
    });
}

exports.get_received_list = function(req, res) {
  if(!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  var email = new RegExp(req.session.user.email, 'i');

  if(!(req.session.auth instanceof Array)){
  Mail
    .find({'mail_header.to':email,'mail_info.release':{$regex:req.session.auth}})
    .sort('mail_info.for_date')
    .exec(function(err, docs) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error', auth:req.session.auth}));
        return;    
      }
      res.send(JSON.stringify({result: 'ok', data: docs, auth:req.session.auth}));
      return;
    });}

   else{
   Mail
    .find({'mail_header.to':email})
    .where('mail_info.domain').in(req.session.auth)
    .sort('mail_info.for_date')
    .exec(function(err, docs) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error',auth:req.session.auth}));
        return;    
      }
      res.send(JSON.stringify({result: 'ok', data: docs, auth:req.session.auth}));
      return;
    });}

}

exports.get_last = function(req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  var email = new RegExp(req.session.user.email, 'i');
  Mail
    .findOne({'mail_header.from': email})
    .sort('-mail_info.create_date')
    .exec(function(err, doc) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error'}));
        return;    
      }
      res.send(JSON.stringify({result: 'ok', data: doc}));
      return;
    });
}

exports.send = function(req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  mail_option = {
    from: req.session.user.email,
    to: req.param('to'),
    cc: req.param('cc'),
    subject: req.param('subject'),
    html: req.param('html')
  };

  sendmail(mail_option, function(err) {
    if (err) {
      res.send(JSON.stringify({result: 'error', data: err}));
      return;
    }
    var mail = new Mail({
      mail_header: {
        from: mail_option.from,
        to: mail_option.to.replace(/\s/, '').split(/[;,]/),
        cc: mail_option.cc.replace(/\s/, '').split(/[;,]/),
        subject: mail_option.subject
      },
      mail_body: mail_option.html,
      mail_info: {
        release: req.param('release') || '',
        domain: req.param('domain') || '',
        for_date: new Date(req.param('for_date') || Date()),
        create_date: new Date(),
        platforms: req.param('platforms') || [],
      }
    });
    mail.save(function(err, m, n) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: err}));
        return;
      }
      res.send(JSON.stringify({result: 'ok'}));
    });
  });
};