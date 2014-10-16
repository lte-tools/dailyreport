'use strict';

var
  connection = require('./db.model').connection,
  sendmail = require('./sendmail/mail.model').sendmail,
  mongoose = require('mongoose'),

  schema = new mongoose.Schema({
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
      for_date: Date,
      create_date: Date,
      platforms: [String]
    }
  }),
  Mail = connection.model('mails', schema),
  Draft = connection.model('drafts', schema);

exports.get_by_id = function (id, next) {
  Mail.findById(id, function (err, mail) {
    next(err, mail);
  });
};

exports.get_sent_list = function (req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  var email = new RegExp(req.session.user.email, 'i');
  Mail
    .find({'mail_header.from': email}, 'mail_info mail_header _id')
    .sort('mail_info.for_date')
    .exec(function (err, docs) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error'}));
        return;
      }      
      res.send(JSON.stringify({result: 'ok', data: docs}));
      return;
    });
};

exports.get_draft_list = function (req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  var email = new RegExp(req.session.user.email, 'i');
  Draft
    .find({'mail_header.from': email}, 'mail_info mail_header _id')
    .sort('mail_info.for_date')
    .exec(function (err, docs) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error'}));
        return;
      }
      res.send(JSON.stringify({result: 'ok', data: docs}));
      return;
    });
};

/*jshint -W024 */
exports.get_received_list = function (user, date, next) {
  if (!user) {
    next(new Error('no user'));
    return;
  }
  var
    release = user.release || [],
    domain = user.domain || [],
    query = Mail.find({'mail_info.for_date': new Date(date)}, 'mail_info mail_header _id');
  if (release.length) {
    query.in('mail_info.release', release);
  }
  if (domain.length) {
    query.in('mail_info.domain', domain);
  }
  query.sort('mail_info.for_date');
  query.exec(function (err, mails) {
    if (err) {
      next(err);
    } else {
      next(null, mails);
    }
  });
};
/*jshint +W024 */

exports.get_last = function (req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  var email = new RegExp(req.session.user.email, 'i');
  Mail
    .findOne({'mail_header.from': email})
    .sort('-mail_info.create_date')
    .exec(function (err, doc) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error'}));
        return;
      }
      res.send(JSON.stringify({result: 'ok', data: doc}));
      return;
    });
};

exports.get_draft = function (mailid, req, res) {
  if (!req.session.user) {
    res.send(JSON.stringify({result: 'error', data: 'please login first'}));
    return;
  }
  var email = new RegExp(req.session.user.email, 'i');
  Draft
    .findOne({'mail_header.from': email,'_id':mailid})
    .exec(function (err, doc) {
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error'}));
        return;
      }
      res.send(JSON.stringify({result: 'ok', data: doc}));
      return;
    });
};

exports.send = function (mail_option, mail_info, next) {
  sendmail(mail_option, function (err) {
    if (err) {
      next(err, null);
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
      mail_info: mail_info
    });
    mail.save(function (err, mail_saved) {
      next(err, mail_saved);
    });
  });
};

exports.delete_draft = function(draft_id, next) {
  Draft.remove({'_id': draft_id},
    function (err) {
      next(err);
    }
  );
};

exports.save_drafts = function (mail_option, mail_info, next) {
  var returnid = mail_option.id;
  var draft = new Draft({
    mail_header: {
      from: mail_option.from,
      to: mail_option.to.replace(/\s/, '').split(/[;,]/),
      cc: mail_option.cc.replace(/\s/, '').split(/[;,]/),
      subject: mail_option.subject
    },
    mail_body: mail_option.html,
    mail_info: mail_info
  });
  if(mail_option.id !== ''){
    Draft.update(
      {'_id':mail_option.id},{$set:{
        'mail_header':mail_option,
        'mail_body':mail_option.html,
        'mail_info':mail_info
      }},{},function (err) {
        next(returnid, err);
      }
    );
  } else {
    draft.save(
      function (err) {
        returnid = draft._id;
        next(returnid, err);
      }
    );
  }
};
