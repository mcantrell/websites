var should = require('should'),
    config = require('../../boot/config.js'),
    mongoose = require('mongoose'),
    database = require('../../boot/database.js'),
    News = mongoose.model(config.model.News);


describe('News Model CRUD', function () {
    var moonWalk = new News({
        title: 'Man has Walked on the Moon!',
        content: 'Can you believe it?!?!? OMG!!one!1',
        happened: new Date('July 21st, 1969'),
        created: new Date(),
        author: 'SpaceNerd2001'
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
            News.find({author: 'SpaceNerd2001'}, function (err, results) {
                should.not.exist(err);
                should.exist(results);
                results.length.should.eql(1);
                done();
            });

        })
    });
    describe('#remove()', function () {
        it('should remove article', function (done) {
            moonWalk.remove(function (err) {
                should.not.exist(err);
                News.find({author: 'SpaceNerd2001'}, function (err, results) {
                    should.not.exist(err);
                    should.exist(results);
                    results.length.should.eql(0);
                    done();
                });
            });
        })
    });
});