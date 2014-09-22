var 
  user,
  config = require('../config'),
  mongoose = require('mongoose'),
  Conn = require('../model/db.model'),
  conn_orig = Conn.connection;

module.exports.test_get_user = function(test) {
  user.get_user('t@t.c', function(err, doc) {
    test.ifError(err);
    if (!doc) {
      user.save_user({
        email: 't@t.c'
      }, function(err, doc) {
        test.ifError(err);
        user.get_user('t@t.c', function(err, doc) {
          test.ifError(err);
          test.equal(doc.email, 't@t.c');
          test.equal(doc.identity, 'user');
          test.equal(doc.release.length, 0);
          test.done();   
        })
      });
    }
    else {
      test.equal(doc.email, 't@t.c');
      test.equal(doc.identity, 'user');
      test.equal(doc.release.length, 0);
      test.done();
    }
  });
};

module.exports.setUp = function (done) {
  Conn.connection = mongoose.createConnection(config.db.url);
  user = require('../model/auth.model'),
  done();
};

module.exports.tearDown = function(done){
  Conn.connection.close(function() {
    mongoose.disconnect(function(err){
      if(err) {
        console.log(err);
      }
      done();
    });
  });
};
