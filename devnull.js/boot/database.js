var config = require("./config.js"),
    mongoose = require("mongoose");

config.logger.info("Connecting to mongodb url: ", config.db.url);
mongoose.connect(config.db.url);

exports.News = require("../models/news.js").News;
exports.User = require("../models/user.js").User;
