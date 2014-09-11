var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);



var route = require('./route/index');
var config = require('./config')
, platform = require('./route/platform')
  , mail = require('./route/mail')
  , auth = require('./route/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));
app.use(cookieParser('dailyreport'));
app.use(session({
  secret: 'dailyreport',
  key: 'dailyreport',
  cookie: {
    maxAge: 1000*60*60*24
  },
  store: new MongoStore({
    url: config.db.url
  }, function() {
    console.log('connect to mongodb success');
  })

}));



app.use(express.static(path.join(__dirname, 'public')));


app.use('/mail', mail);
app.use('/auth', auth);
app.use('/platform', platform);
app.use('/', route);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
