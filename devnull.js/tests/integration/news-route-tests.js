var should = require("should"),
    config = require("../../boot/config.js"),
    mongoose = require("mongoose"),
    News = mongoose.model(config.model.News),
    routes = require("../../routes/admin/news-route.js");

require("./database-setup.js");


describe("News Admin Routes", function () {
    describe("GET /admin/news", function () {
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
    describe("POST /admin/news", function () {
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