var config = require('../../boot/config.js'),
    db = require('../../boot/database.js'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;


function SecurityService() {
    this.passport;
}

SecurityService.prototype.forGooglePassport = function() {
    var self = this;
    this.passport = passport.use(new GoogleStrategy({
            returnURL: config.passport.returnUrl,
            realm: config.passport.realm
        }, self.lookupAuthenticatedUser
    ));
    this.passport.serializeUser(function (user, done) {
        done(null, user.id)
    });
    this.passport.deserializeUser(function (id, done) {
        self.lookupAuthenticatedUser(id, {}, done)
    });
    return this;
};

SecurityService.prototype.lookupAuthenticatedUser = function (identifier, profile, done) {
    config.logger.info("Attempting to login with id: ", identifier);
    config.logger.info("Profile: ", profile);
    db.User.findById(identifier, function (err, user) {
        done(err, user);
    });
};

exports = module.exports = new SecurityService();