var config = require('../boot/config.js'),
    security = require('../lib/security').forGooglePassport();

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

exports.login = security.passport.authenticate('google');
exports.verify = security.passport.authenticate('google', { successRedirect: '/', failureRedirect: '/401' });

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

