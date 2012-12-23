/**
 * Module dependencies.
 */

var express = require('express'),
    config = require('./config.js'),
    routes = require('./routes'),
    news = require("./routes/news.js"),
    http = require('http'),
    util = require('util'),
    mongoose = require('mongoose'),
    path = require('path');


/* ------------------ App Config -------------------- */
var app = express();
app.configure(function () {
    app.set('port', config.server.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: config.server.name }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

/* ------------------ Routes -------------------- */
app.get('/', routes.index);
app.get('/zuul', routes.zuul);
app.get('/about', routes.about);
app.get('/401', routes.unauthorized);
app.get('/news', news.index);

/* ------------------ Server -------------------- */
http.createServer(app).listen(config.server.port, function () {
    console.log("Express server listening on port " + app.get('port'));
});
