var should = require('should'),
    config = require('../../boot/config.js'),
    mongoose = require('mongoose'),
    database = require('../../boot/database.js'),
    News = mongoose.model(config.model.News);


before(function (done) {
    config.logger.info("Waiting on database connection to open..");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        config.logger.info("Database connection opened");
        config.logger.info("Removing all records from news collection");
        News.collection.remove( function (err) {
            should.not.exist(err);
            config.logger.info("News collection should be empty now");
            done();
        });
    });
});