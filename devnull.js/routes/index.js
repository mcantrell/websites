var mongoose = require("mongoose"),
    config = require("../boot/config.js"),
    marked = require('marked'),
    News = mongoose.model(config.model.News);

exports.index = function (req, res) {
    News.find({}, function(err, results) {
        res.render('index', { title: 'Welcome', newsList: results, markdown:marked });
    });
};

exports.zuul = function (req, res) {
    res.render('zuul', { title: 'Zuul' });
};

exports.about = function (req, res) {
    res.render('about', { title: 'Mike Cantrell' });
};

exports.unauthorized = function(req, res) {
    res.render('401', { title: 'Unauthorized' });
};

exports.news = require("./admin/news-routes.js");