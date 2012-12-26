var mongoose = require("mongoose"),
    config = require("../../boot/config.js"),
    marked = require('marked'),
    News = mongoose.model(config.model.News);

exports.index = function(req, res){
    config.logger.info("Requesting news articles..");
    News.find({}, function(err, results) {
        res.render('admin/news', { title: 'News', newsList: results, markdown: marked });
    });
};

exports.add = function(req, res, next){
    config.logger.info("Adding news article..");
    var news = new News({
        title: req.param('title', null),
        content: req.param('content', null),
        author: req.param('author', null),
        created: new Date(),
        happened: req.param('happened', new Date())
    });
    news.save(function(error){
        if (error) next(error);
        else res.redirect("/admin/news");
    });
};

exports.remove = function(req, res, next){
    var id = req.param('id',null);
    config.logger.info("Removing news article id:", id);
    News.findByIdAndRemove(id, function(error){
        if (error) next(error);
        else res.redirect("/admin/news");
    });
};