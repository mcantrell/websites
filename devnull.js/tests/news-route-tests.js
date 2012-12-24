var should = require("should")
    , routes = require("../routes/news.js");


describe("News Routes", function(){
    describe("/news", function(){
        it("should provide a title and list of news records", function(done){
            var response = {
                render: function(view, data) {
                    view.should.equal("news/index");
                    should.exist(data.newsList);
                    data.title.should.equal("News");
                    done();
                }
            };
            routes.index({}, response);
        });

    });
});