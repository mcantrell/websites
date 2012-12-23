var should = require('should'),
    NewsRepository = require('./repositories/news-repository.js').NewsRepository;

var repo;

before(function (done) {
    console.log("Creating test dependencies");
    repo = new NewsRepository(function (error, client) {
        console.log("Finished creating test dependencies");
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