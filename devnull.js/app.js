/**
 * Module dependencies.
 */

var express = require('express'),
    config = require('./boot/config.js'),
    database = require("./boot/database.js"),
    routes = require('./routes'),
    http = require('http'),
    util = require('util'),
    path = require('path');

/* ------------------ App Config -------------------- */
var app = express();
app.configure(function () {
    app.set('port', config.server.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.logger('default'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: config.server.salt }));
    app.use(app.router);
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
app.get('/news', routes.news.index);

/* ------------------ Server -------------------- */
http.createServer(app).listen(config.server.port, function () {
    console.log("Express server listening on port " + app.get('port'));
});
