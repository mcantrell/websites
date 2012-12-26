var winston = require("winston");

var config = {};

config.model = {};
config.model.News = 'News';

config.server = {};
config.server.host = process.env.DEVNULL_JS_HOST || "localhost";
config.server.port = process.env.DEVNULL_JS_PORT || 3000;
config.server.salt = process.env.DEVNULL_JS_SALT || 'notsosecret';

config.db = {};
config.db.url = process.env.MONGO_URL || "mongodb://localhost/devnull_test";

config.passport = {};
config.passport.returnUrl = process.env.PASSPORT_RETURN_URL || 'http://localhost:3000/login/verify';
config.passport.realm = process.env.PASSPORT_REALM || 'http://localhost:3000/';


module.exports = config;
module.exports.logger =  new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});