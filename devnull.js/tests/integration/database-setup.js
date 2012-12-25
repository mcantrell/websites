var should = require('should'),
    config = require('../../boot/config.js'),
    mongoose = require('mongoose'),
    database = require('../../boot/database.js'),
    News = mongoose.model(config.model.News);


before(function (done) {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        done();
    });
});
before(function (done) {
    News.collection.remove( function (err) {
        should.not.exist(err);
        done();
    });
});
