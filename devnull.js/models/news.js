var mongoose = require("mongoose"),
    config = require("../boot/config.js");

var NewsSchema = new mongoose.Schema({
    title: String,
    content: String,
    happened: Date,
    created: Date,
    author: String
});

mongoose.model(config.model.News, NewsSchema);