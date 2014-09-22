var user = require('../model/auth.model.js'),
  mongoose = require('mongoose');

exports.test_get_user = function(test) {
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

exports.tearDown = function(done){
  mongoose.disconnect(function(err){
    if(err) {
      console.log(err);
    }
    console.log('mongoose is disconnected');
  });
  done();
};
