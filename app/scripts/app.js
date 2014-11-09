'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
angular
  .module('myApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
  
    var checkLogin = function($q, $location, $http, User, $timeout) {
      var deferred = $q.defer();
      $http.get('/api/user')
      .success(function(user){
        if(user) {
          $timeout(function(){
            User.user = user;
          });
          deferred.resolve(user);
        }
        else {
          deferred.reject();
          $location.url('/login');
        }
      });
    };
  
    var softLogin = function($q, $http, User, $timeout) {
      var deferred = $q.defer();
      $http.get('/api/user')
      .success(function(user) {
        $timeout(function(){
          User.user = user;
        });
        deferred.resolve(user);
      });
    };
  
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {loggedIn:softLogin}
      })
      .when('/login', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {loggedIn:softLogin}
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
