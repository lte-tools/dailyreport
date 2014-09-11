
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var route = require('./route');
var app = express();
var MongoStore = require('connect-mongo')(express);
var config = require('./config')

console.log(config.db.url);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb'}));
app.use(express.methodOverride());
app.use(express.bodyParser({limit: '5mb'}));
app.use(express.cookieParser('dailyreport'));
app.use(express.session({
  secret: 'dailyreport',
  key: 'dailyreport',
  cookie: {
    maxAge: 1000*60
  },
  store: new MongoStore({
    db: 'dailyreport',
    username: 'dailyreport',
    password: 'asb#1234',
  }, function() {
    console.log('connect to mongodb success');
  })

}));
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));

var less_compile_force = false;
// development only
//NODE_ENV == 'development'
if ('development' == app.get('env')) {
  console.log('env development');
  app.use(express.errorHandler());
  less_compile_force = true;
}

console.log('less force compile: ' + less_compile_force);
//support less
var less = require('less-middleware');
app.use(less({
  src: __dirname + '/public/css/less',
  dest: __dirname + '/public/css',
  prefix: '/css',
  force: less_compile_force
}));

// less declaring must before than static 
app.use(express.static(path.join(__dirname, 'public')));

route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

