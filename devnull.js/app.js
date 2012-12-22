/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , zuul = require('./routes/zuul')
    , about = require('./routes/about')
    , errors = require('./routes/errors')
    , http = require('http')
    , util = require('util')
    , passport = require('passport')
    , GoogleStrategy = require('passport-google').Strategy
    , path = require('path');

var users = {
    'https://www.google.com/accounts/o8/id?id=AItOawkw5lt5oauub3yJYk7qigE0COQcGFfukYE': {
        id: 'https://www.google.com/accounts/o8/id?id=AItOawkw5lt5oauub3yJYk7qigE0COQcGFfukYE',
        name: 'Mike Cantrell'
    }
};

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/'
    },
    function(identifier, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            console.log("OpenID token: " + identifier);
            var user = users[identifier];
            return done(null, user);
        });
    }
));

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'notsosecret' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/zuul', zuul.index);
app.get('/about', about.index);
app.get('/401', errors.unauthorized);

app.get('/auth/google',
    passport.authenticate('google'),
    function(req, res){
        // The request will be redirected to Google for authentication, so
        // this function will not be called.
    });
app.get('/auth/google/return',
    passport.authenticate('google', { failureRedirect: '/401' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
