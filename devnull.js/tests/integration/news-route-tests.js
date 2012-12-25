var should = require("should"),
    config = require("../../boot/config.js"),
    mongoose = require("mongoose"),
    database = require("../../boot/database.js"),
    News = mongoose.model(config.model.News),
    routes = require("../../routes/admin/news.js");

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


describe("News Routes", function () {
    describe("GET /news", function () {
        it("should provide a title and list of news records", function (done) {
            var response = {
                render: function (view, data) {
                    view.should.equal("admin/news");
                    should.exist(data.newsList);
                    data.title.should.equal("News");
                    done();
                }
            };
            routes.index({}, response);
        });

    });
    describe("POST /news", function () {
        var params = {
            title: "test title",
                content: "test content",
                happened: "12/12/2012",
                author: "test author"
        };
        it("should persist a news article and redirect to list", function (done) {
            var response = {
                redirect: function (view) {
                    view.should.equal("/admin/news");
                    News.find(params, function(err, results) {
                        should.not.exist(err);
                        results.length.should.eql(1);
                        done();
                    });
                }
            };
            var request = {
                param: function (name, defaultVal) {
                    return params[name] || defaultVal;
                }
            };
            routes.add(request, response);
        });

    });
});