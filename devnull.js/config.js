var config = {};


config.server = {};
config.server.port = process.env.DEVNULL_JS_PORT || 3000;
config.server.salt = process.env.DEVNULL_JS_SALT || 'notsosecret';

module.exports = config;