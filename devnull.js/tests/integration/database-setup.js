var should = require('should'),
    async = require('async'),
    config = require('../../boot/config.js'),
    mongoose = require('mongoose'),
    db = require('../../boot/database.js');

var testUser = new db.User({
    _id: "http://devnull.org/users/testUser",
    displayName: "Test User",
    name: {
        givenName: "Test",
        familyName: "User",
        middleName: "J"
    },
    emails: [
        {value: "test.user@devnull.org", type: "personal", main:true},
        {value: "test.user@work.com", type: "work"}
    ]

});

var moonWalk = new db.News({
    title: 'Man has Walked on the Moon!',
    content: 'Can you believe it?!?!? OMG!!one!1',
    happened: new Date('July 21st, 1969'),
    created: new Date(),
    author: 'SpaceNerd2001'
});

before(function (done) {
    config.logger.info("Waiting on database connection to open..");
    var connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function () {
        config.logger.info("Database connection opened");
        async.series([
            function (callback) {
                config.logger.info("Removing all records from news collection");
                db.News.collection.remove(function (err) {
                    should.not.exist(err);
                    callback();
                });

            },
            function (callback) {
                config.logger.info("Removing all records from user collection");
                db.User.collection.remove(function (err) {
                    callback(err);
                });
            },
            function (callback) {
                moonWalk.save(function (err) {
                    config.logger.info("Created test news article : ", moonWalk.id);
                    callback(err);
                });
            },
            function (callback) {
                testUser.save(function (err) {
                    config.logger.info("Creating test user: ", testUser.id);
                    callback(err);
                });
            }
        ],
        function (err) {
                should.not.exist(err);
                config.logger.info("Done with database setup");
                done();
            });
    });
});

exports.testUsers = [testUser];
exports.testNews = [moonWalk];