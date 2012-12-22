

exports.index = function(req, res){
  res.render('index', { title: 'Welcome' });
};

exports.zuul = function(req, res){
    res.render('zuul', { title: 'Zuul' });
};

exports.about = function(req, res){
    res.render('about', { title: 'Mike Cantrell' });
};

exports.unauthorized = function (req, res) {
    res.render('401', { title: 'Not Authorized' });
};
