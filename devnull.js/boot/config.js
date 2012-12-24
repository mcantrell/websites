var config = {};

config.model = {};
config.model.News = 'News';

config.server = {};
config.server.host = process.env.DEVNULL_JS_HOST || "localhost";
config.server.port = process.env.DEVNULL_JS_PORT || 3000;
config.server.salt = process.env.DEVNULL_JS_SALT || 'notsosecret';

config.db = {};
config.db.url = process.env.MONGO_URL || "mongodb://localhost/devnull_test";


module.exports = config;