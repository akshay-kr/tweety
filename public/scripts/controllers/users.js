'use strict';
/*jshint node:true, quotmark:false*/
/*global angular*/
angular.module('tweetyApp')
	.controller('UsersController', function ($scope, $http, baseUrl, $state) {
		function getUsers() {
			$http.get(baseUrl + "/users")
				.success(function (users) {
					$scope.users = users;
				})
				.error(function (err) {
					console.log(err);
				});
		}

		$scope.add = function () {
			$scope.adding = true;
			$http.post(baseUrl + "/add/user", {
					screenName: $scope.screenName
				})
				.success(function () {
					var user = {
						screenName: $scope.screenName
					};
					$scope.users.push(user);
				})
				.error(function (err) {
					console.log(err);
				})
				.finally(function () {
					$scope.adding = false;
				});
		};

		$scope.openUser = function (screenName) {
			$state.go('timeline', {
				screenname: screenName
			});
		};
		getUsers();
	});