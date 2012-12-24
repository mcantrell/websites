var mongoose = require("mongoose"),
    config = require("../../boot/config.js"),
    News = mongoose.model(config.model.News);

exports.index = function(req, res){
    config.logger.info("Requesting news articles..");
    News.find({}, function(err, results) {
        res.render('admin/news', { title: 'News', newsList: results });
    });
};