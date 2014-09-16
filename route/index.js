var express = require('express')
  , router = express.Router()
  , mail = require('../model/mail.model')
  , login = require('./login')
  , auth = require('./auth.main')
  , mongoose = require('mongoose')
  , connection = require('../model/db.model').connection;



var userAuthen = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login?ref=' + 'http://' + req.headers['host'] + req.url);
  }
  else {
    next();
  }
};



var Auth = connection.model('auths');


router.get('/login', function(req, res) {
  login.login(req, res);
});
router.get('/doc', function(req, res) {
  res.render('doc');
})

router.get('*', userAuthen);

router.get('/welcome', function(req, res) {
  login.welcome(req, res);
});
router.get(/\/editor(.*)/, function(req, res) {
  res.render('editor');
});

router.get('/', function(req, res) {
  var username = req.session.user.email;
  Auth
    .findOne({'name':username})
    .exec(function(err, doc){
      if (err) {
        res.send(JSON.stringify({result: 'error', data: 'service database error'}));
        return;
      }



      var auth=new Auth({
        name:username
      , identity:'user'
      , release:'null'
      , domain:[]     
      });
   
 
      if(!doc){
        
       auth.save(function(err,auth){
         if(err) return console.log(err);
         return ;
       });
       
        res.render('user', {user: req.session.user});
      }else{
        if(doc.identity=='manager'){
           if(doc.release!='null'){
           req.session.auth=doc.release;
           res.render('manager', {user: req.session.user});}
           else if(doc.domain!='null'){
           req.session.auth=doc.domain;
           res.render('manager', {user: req.session.user});
           }

         }

         else{
       
          res.render('user', {user: req.session.user});
         }
       
      }
      
      return ;
    })



   
  
  
 
  
});

module.exports = router;
