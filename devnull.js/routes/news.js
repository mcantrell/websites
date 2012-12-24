var mongoose = require("mongoose"),
    config = require("../boot/config.js"),
    News = mongoose.model(config.model.News);

exports.index = function(req, res){
    News.find({}, function(err, results) {
        res.render('news/index', { title: 'News', newsList: results });
    });
};