var mongoose = require("mongoose"),
    config = require("../boot/config.js");


var options = {
    collection: 'news'
};
var NewsSchema = new mongoose.Schema({
    title: String,
    content: String,
    happened: Date,
    created: Date,
    author: String
}, options);

exports.News = mongoose.model("news", NewsSchema);