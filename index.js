/*jshint node:true*/
'use strict';
var config = require('./config.json');
var express = require('express');
var app = express();
var q = require('q');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoConnectionUrl = config.mongo.connUrl;
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var OAuth2 = require('OAuth').OAuth2;
var oauth2 = new OAuth2(config.twitter.consumer_key, config.twitter.consumer_secret, 'https://api.twitter.com/', null, 'oauth2/token', null);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});
var client;
oauth2.getOAuthAccessToken('', {
	'grant_type': 'client_credentials'
}, function (err, access_token) {
	if (!err) {
		client = new Twitter({
			consumer_key: config.twitter.consumer_key,
			consumer_secret: config.twitter.consumer_secret,
			bearer_token: access_token
		});
	}
});

app.get('/info/:screenname', function (req, res) {
	var screenName = req.params.screenname;
	if (client) {
		q.all([getUserInfo(screenName), getTweets(screenName)]).then(function (results) {
			res.send(results);
		}, function (err) {
			res.status(500).send(err);
		});
	} else {
		res.status(500).send("Failed to authenticate.");
	}
});

function getTweets(screenName) {
	var deferred = q.defer();
	client.get('statuses/user_timeline', {
		tweet_mode:'extended',
		screen_name: screenName
	}, function (error, tweets) {
		if (!error) {
			deferred.resolve(tweets);
		} else {
			deferred.reject(error);
		}
	});
	return deferred.promise;
}

function getUserInfo(screenName) {
	var deferred = q.defer();
	client.get('/users/show', {
		screen_name: screenName
	}, function (error, info) {
		if (!error) {
			deferred.resolve(info);
		} else {
			deferred.reject(error);
		}
	});
	return deferred.promise;
}


app.get('/users', function (req, res) {
	MongoClient.connect(mongoConnectionUrl, function (err, db) {
		if (err) {
			res.status(500).send(err);
		} else {
			var collection = db.collection(config.mongo.collection);
			var cursor = collection.find();
			cursor.toArray(
				function (err, docs) {
					if (err) {
						res.status(500).send(err);
					} else {
						res.send(docs);
					}
					db.close();
				});
		}
	});
});

app.post('/add/user', function (req, res) {
	var screenName = req.body.screenName;
	MongoClient.connect(mongoConnectionUrl, function (err, db) {
		if (err) {
			res.status(500).send(err);
		} else {
			var collection = db.collection(config.mongo.collection);
			collection.insert({
				screenName: screenName
			}, function (err) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.send("OK");
				}
				//Close connection
				db.close();
			});
		}
	});
});

app.listen(config.port);