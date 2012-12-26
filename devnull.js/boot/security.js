var config = require('./config.js'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;

// TODO load users from database
var users = {
    'https://www.google.com/accounts/o8/id?id=AItOawkw5lt5oauub3yJYk7qigE0COQcGFfukYE': {
        id: 'https://www.google.com/accounts/o8/id?id=AItOawkw5lt5oauub3yJYk7qigE0COQcGFfukYE',
        name: 'Mike Cantrell'
    }
};

passport.use(new GoogleStrategy({
        returnURL: config.passport.returnUrl,
        realm: config.passport.realm
    },
    function(identifier, profile, done) {
        config.logger.info("Attempting to login with id: ", identifier);
        config.logger.info("Profile: ", profile);
        return done(null, users[identifier]);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, users[id])
});

exports.passport = passport;