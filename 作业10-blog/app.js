
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');
var session = require('express-session');
const MongoStore=require('connect-mongo')(express);
var cookieParser = require('cookie-parser');


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
    app.use(session({
        store: new MongoStore({url:'mongodb://localhost:27017/sessions'}),
        resave: false,
        saveUninitialized: false,
        secret: 'modern web programming'
   }));
  app.use(cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);

});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/sign/:name', routes.sign);

// JSON API

app.get('/api/posts', api.posts);
app.get('/api/logout',api.logout);
app.post('/api/signin',api.signin);
app.post('/api/signup',api.signup);
app.post('/api/replyPost',api.replyPost);
app.post('/api/search',api.search);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
