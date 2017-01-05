/*jshint node:true, quotmark:false*/
/*global angular*/
(function () {

    'use strict';
    var app = angular.module('tweetyApp', ['ngRoute', 'ui.router']);
    app.constant('baseUrl', 'http://localhost:9030');
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'views/users.html',
                controller: 'UsersController',
            })
            .state('timeline', {
                url: '/timeline/:screenname',
                templateUrl: 'views/timeline.html',
                controller: 'TimelineController',
            });

    });
})();