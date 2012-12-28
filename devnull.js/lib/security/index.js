var config = require('../../boot/config.js'),
    db = require('../../boot/database.js'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;


function SecurityService() {
    var self = this;
    this.passport = passport;
    passport.use(new GoogleStrategy({
            returnURL: config.passport.returnUrl,
            realm: config.passport.realm
        }, self.lookupAuthenticatedUser
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });
    passport.deserializeUser(function (id, done) {
        self.lookupAuthenticatedUser(id, {}, done)
    });
}

SecurityService.prototype.lookupAuthenticatedUser = function (identifier, profile, done) {
    config.logger.info("Attempting to login with id: ", identifier);
    config.logger.info("Profile: ", profile);
    db.User.findById(identifier, function (err, user) {
        done(err, user);
    });
};

exports = module.exports = new SecurityService();