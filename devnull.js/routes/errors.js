

exports.unauthorized = function(req, res){
  res.render('401', { title: 'Not Authorized',  user: req.user });
};