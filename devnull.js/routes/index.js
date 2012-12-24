

exports.index = function(req, res){
  res.render('index', { title: 'Welcome' });
};

exports.zuul = function(req, res){
    res.render('zuul', { title: 'Zuul' });
};

exports.about = function(req, res){
    res.render('about', { title: 'Mike Cantrell' });
};

exports.news = require("./admin/news.js");