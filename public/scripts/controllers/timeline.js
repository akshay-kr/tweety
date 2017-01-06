'use strict';
/*jshint node:true, quotmark:false*/
/*global angular*/
angular.module('tweetyApp')
	.controller('TimelineController', function ($stateParams, $state, $scope, $http, baseUrl) {
		var screenName = $stateParams.screenname;

		function getInfo(screenName) {
			$http.get(baseUrl + "/info/" + screenName)
				.success(function (data) {
					console.log(data);
					$scope.timeline = data[1];
					$scope.userInfo = data[0];
				})
				.error(function (err) {
					console.log(err);
				});
		}

		$scope.formatDate = function (date) {
			return new Date(date);
		};

		$scope.format = function (count) {
			if (count || count === 0) {
				return Math.abs(Number(count)) >= 1.0e+9 ? Math.abs(Number(count)) / 1.0e+9 + "B" : Math.abs(Number(count)) >= 1.0e+6 ? (Math.abs(Number(count)) / 1.0e+6).toFixed(1) + "M" : Math.abs(Number(count)) >= 1.0e+3 ? (Math.abs(Number(count)) / 1.0e+3).toFixed(1) + "K" : Math.abs(Number(count));
			}
		};
		$scope.parseImageUrl = function (url) {
			if (url) {
				url = url.replace("_normal", "");
				return url;
			}
		};

		$scope.addTweet = function (msg) {
			var tweet = {
				created_at: new Date(),
				favorite_count: 0,
				retweet_count: 0,
				full_text: msg
			};
			tweet.user = {
				screen_name: $scope.userInfo.screen_name,
				name: $scope.userInfo.name
			};
			$scope.timeline.unshift(tweet);
			$scope.newTweet = '';
		};
		getInfo(screenName);
	});