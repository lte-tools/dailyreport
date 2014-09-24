var 
  sendmail = require('../model/sendmail/mail.model'),
  sendmail_orig = sendmail.sendmail,
  config = require('../config'),
  mail,
  mongoose = require('mongoose'),
  Conn = require('../model/db.model'),
  conn_orig = Conn.connection,

  mail_option = {
    from: 'test@node.com',
    to: 'to@node.com; to2@node.com',
    cc: 'cc@node.com',
    subject: 'test node',
    html: 'test content'
  },
  mail_info = {
    release: 'LR14',
    domain: 'KPI',
    for_date: new Date('2014-09-09'),
    platforms: ['SH-TEST1', 'SH-TEST2']
  };

module.exports.setUp = function (done) {
  sendmail.sendmail = function (mail_option, callback) {
    callback(null);
  };
  Conn.connection = mongoose.createConnection(config.db.url);
  mail = require('../model/mail.model');
  done();
};

module.exports.tearDown = function (done) {
  Conn.connection.close(function() {
    mongoose.disconnect(function(err){
      if (err) {
        console.log(err);
      }
      done();
    });
  });
};

module.exports.test_send_mail = function (test) {
  mail.send(mail_option, mail_info, function (err, mail_saved) {
    test.ifError(err);
    var 
      mail_id = mail_saved._id;

    mail.get_by_id(mail_id, function(err, r_mail) {
      test.ifError(err);
      test.equal(r_mail.mail_info.release, 'LR14');
      test.equal(r_mail.mail_info.domain, 'KPI');
      test.equal(r_mail.mail_info.for_date, String(new Date('2014-09-09')));
      test.equal(r_mail.mail_info.platforms.length, 2) ;
      test.done();
    });
  });
};
