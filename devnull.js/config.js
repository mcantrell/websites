var config = {};


config.server = {};
config.server.host = process.env.DEVNULL_JS_HOST || "localhost";
config.server.port = process.env.DEVNULL_JS_PORT || 3000;
config.server.name = process.env.DEVNULL_JS_SALT || 'notsosecret';

config.db = {};
config.db.host = process.env.MONGO_HOST || "localhost";
config.db.port = process.env.MONGO_PORT || 27017;
config.db.name = process.env.MONGO_NAME || 'devnull';

module.exports = config;