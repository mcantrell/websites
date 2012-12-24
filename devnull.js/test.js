var should = require('should'),
    mongoose = require('mongoose'),
    async = require('async'),
    NewsRepository = require('./repositories/news-repository.js').NewsRepository;

var repo;
var db;

before(function (done) {
    console.log("Creating NewsRepository");
    repo = new NewsRepository(function (error, client) {
        console.log("Finished creating test dependencies");
        should.not.exist(error);
        should.exist(client);
        done();
    });
});

before(function (done) {
    console.log("Creating mongoose connection");
    mongoose.connect('mongodb://localhost/devnull_test');
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        done();
    });
});

describe('List News', function () {
    it('should list records', function () {
        repo.findAll(function (error, results) {
            should.not.exist(error);
            should.exist(results);
        });
    });
});

describe('Spike for Mongoose', function () {
    var newsSchema = mongoose.Schema({
        title: String,
        content: String,
        happened: Date,
        created: Date,
        author: String
    });
    var News = mongoose.model('News', newsSchema);
    var moonWalk = new News({
        title: 'Man has Walked on the Moon!',
        content: 'Can you believe it?!?!? OMG!!one!1',
        happened: new Date('July 21st, 1969'),
        created: new Date(),
        author: 'SpaceNerd2001'
    });
    describe("#clean", function() {
        it('should remove test data', function(done) {
            News.collection.remove( function (err) {
                should.not.exist(err);
                done();
            });
        });
    });
    describe('#save()', function () {
        it('should save article', function (done) {
            moonWalk.save(function (err, moonWalk) {
                should.not.exist(err);
                moonWalk.should.have.property('_id');
                done();
            });
        });
    });
    describe('#find()', function () {
        it('should find article', function (done) {
            News.find({author:'SpaceNerd2001'}, function(err, results) {
                should.not.exist(err);
                should.exist(results);
                results.length.should.eql(1);
                done();
            });

        })
    });
    describe('#remove()', function () {
        it('should remove article', function (done) {
            moonWalk.remove(function(err) {
                should.not.exist(err);
                News.find({author:'SpaceNerd2001'}, function(err, results) {
                    should.not.exist(err);
                    should.exist(results);
                    console.log(results);
                    results.length.should.eql(0);
                    done();
                });
            });
        })
    });
});