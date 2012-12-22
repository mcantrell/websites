var config = {};


config.server = {};
config.server.port = process.env.PORT || 3000;
config.server.salt = process.env.SALT || 'notsosecret';

module.exports = config;