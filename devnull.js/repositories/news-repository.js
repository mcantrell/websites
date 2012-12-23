var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var config = require("../config.js");


NewsRepository = function (callback) {
    if (!callback) { callback = function() {}}
    console.log("Connecting to mongodb " + config.db.host + ":" + config.db.port);
    this.db = new Db(config.db.name, new Server(config.db.host, config.db.port, {auto_reconnect: true}), {safe: false});
    this.db.open(function (err, client) {
        if (err) callback(error);
        else callback(null, client)
    });
};


NewsRepository.prototype.getCollection = function (callback) {
    this.db.collection('news', function (error, news_collection) {
        if (error) callback(error);
        else callback(null, news_collection);
    });
};

NewsRepository.prototype.findAll = function (callback) {
    this.getCollection(function (error, news_collection) {
        if (error) callback(error);
        else {
            news_collection.find().toArray(function (error, results) {
                if (error) callback(error);
                else callback(null, results)
            });
        }
    });
};


exports.NewsRepository = NewsRepository;