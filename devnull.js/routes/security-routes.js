var config = require('../boot/config.js'),
    db = require('../boot/database.js'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    lookupAuthenticatedUser(id, {}, done);
});

exports.unauthorized = function (req, res) {
    config.logger.error("Unauthorized authentication attempt");
    res.statusCode = 401;
    res.render('401', { title: 'Unauthorized'});
};

exports.authenticated = function restrict(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

var lookupAuthenticatedUser = function (identifier, profile, done) {
    config.logger.info("Attempting to login with id: ", identifier);
    config.logger.info("Profile: ", profile);
    db.User.findById(identifier, function (err, result) {
        done(err, result);
    });
};


passport.use(new GoogleStrategy({
        returnURL: config.passport.returnUrl,
        realm: config.passport.realm
    }, lookupAuthenticatedUser
));

exports.passport = passport;
exports.lookupAuthenticatedUser = lookupAuthenticatedUser;