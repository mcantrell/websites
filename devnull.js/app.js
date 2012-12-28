/**
 * Module dependencies.
 */

var express = require('express'),
    config = require('./boot/config.js'),
    database = require("./boot/database.js"),
    security = require('./lib/security'),
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
    app.use(security.passport.initialize());
    app.use(security.passport.session());
    app.use(function (req, res, next) {
        res.locals.user = req.user;
        next();
    });
    app.use(app.router);

});
app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

/* ------------------ Routes -------------------- */
app.get('/', routes.index);
app.get('/zuul', routes.zuul);
app.get('/about', routes.about);

app.get('/admin/news', routes.security.authenticated, routes.news.index);
app.post('/admin/news', routes.security.authenticated, routes.news.add);
app.get('/admin/news/remove/:id', routes.security.authenticated, routes.news.remove);

app.get('/login', routes.security.login);
app.get('/logout', routes.security.logout);
app.get('/login/verify', routes.security.verify);

app.get('/401', routes.security.unauthorized);

/* ------------------ Server -------------------- */
http.createServer(app).listen(config.server.port, function () {
    config.logger.info("Express server listening on port " + app.get('port'));
});
