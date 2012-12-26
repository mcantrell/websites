var should = require("should"),
    config = require("../../boot/config.js"),
    mongoose = require("mongoose"),
    News = mongoose.model(config.model.News),
    routes = require("../../routes/admin/news-routes.js");

require("./database-setup.js");

var testArticle;

describe("News Admin Routes", function () {
    describe("#index()", function () {
        it("should provide a title and list of news records", function (done) {
            var response = {
                render: function (view, data) {
                    view.should.equal("admin/news");
                    should.exist(data.newsList);
                    should.exist(data.markdown);
                    data.title.should.equal("News");
                    done();
                }
            };
            routes.index({}, response);
        });
    });
    describe("#add()", function () {
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
                    News.findOne(params, function (err, newsArticle) {
                        should.not.exist(err);
                        should.exist(newsArticle);
                        newsArticle.should.have.property('_id');
                        newsArticle.title.should.eql(params.title);
                        config.logger.info("Created news article: ", newsArticle.id);
                        testArticle = newsArticle;
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
    describe("#remove()", function () {
        it("should remove persisted article and redirect to list", function (done) {
            var params = {id: testArticle.id};
            var response = {
                redirect: function (view) {
                    view.should.equal("/admin/news");
                    News.findById(params.id, function (err, results) {
                        should.not.exist(err);
                        should.not.exist(results);
                        done();
                    });
                }
            };
            var request = {
                param: function (name, defaultVal) {
                    return params[name] || defaultVal;
                }
            };
            routes.remove(request, response);
        });
    });
});

