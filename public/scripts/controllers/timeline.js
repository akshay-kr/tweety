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
			return Math.abs(Number(count)) >= 1.0e+9 ? Math.abs(Number(count)) / 1.0e+9 + "B" : Math.abs(Number(count)) >= 1.0e+6 ? (Math.abs(Number(count)) / 1.0e+6).toFixed(1) + "M" : Math.abs(Number(count)) >= 1.0e+3 ? (Math.abs(Number(count)) / 1.0e+3).toFixed(1) + "K" : Math.abs(Number(count));
		};

		$scope.formatMsg = function (text, entities) {
			var hashtags = entities.hashtags;
			if (hashtags.length > 0) {
				hashtags.forEach(function (hashtag) {
					text = text.replace('#' + hashtag.text, '<span class="hash">#' + hashtag.text + '</span>');
				});
			}
			return text;
		};
		$scope.parseImageUrl = function (url) {
			if (url) {
				url = url.replace("_normal", "");
				return url;
			}
		};
		getInfo(screenName);
	});