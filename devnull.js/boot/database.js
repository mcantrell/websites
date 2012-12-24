var config = require("./config.js"),
    mongoose = require("mongoose");

mongoose.connect(config.db.url);

require("../models/news.js");
