var NewsRepository = require('../repositories/news-repository.js').NewsRepository;

var newsRepo = new NewsRepository();

exports.index = function(req, res){
    newsRepo.findAll(function(err, results) {
        res.render('news/index', { title: 'News', newsList: results });
    });
};