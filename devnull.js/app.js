/**
 * Module dependencies.
 */

var express = require('express')
    , config = require('./config.js')
    , routes = require('./routes')
    , http = require('http')
    , util = require('util')
    , path = require('path');


/* ------------------ App Config -------------------- */
var app = express();
app.configure(function () {
    app.set('port', config.server.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: config.server.salt }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});


/* ------------------ Routes -------------------- */
app.get('/', routes.index);
app.get('/zuul', routes.zuul);
app.get('/about', routes.about);
app.get('/401', routes.unauthorized);

/* ------------------ Server -------------------- */
http.createServer(app).listen(config.server.port, function () {
    console.log("Express server listening on port " + app.get('port'));
});
