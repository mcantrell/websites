var mongoose = require("mongoose"),
    config = require("../boot/config.js"),
    marked = require('marked'),
    db = require("../boot/database.js");

exports.index = function (req, res) {
    db.News.find({}, function(err, results) {
        res.render('index', { title: 'Welcome', newsList: results, markdown:marked });
    });
};

exports.zuul = function (req, res) {
    res.render('zuul', { title: 'Zuul' });
};

exports.about = function (req, res) {
    res.render('about', { title: 'Mike Cantrell' });
};

exports.security = require("./security-routes.js");
exports.news = require("./admin/news-routes.js");
